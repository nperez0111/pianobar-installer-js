const homedir = require( 'homedir' )(),
    youSure = require( './youSure' ),
    logToFile = require( './shared' ).logToAFile,
    text = ( { homedir } ) => `#!/usr/bin/ruby
require 'json'
trigger = ARGV.shift
songinfo = {}
STDIN.each_line { |line| songinfo.store(*line.chomp.split('=', 2))}
File.open("${homedir}/.config/pianobar/cur.json","w") do |f|
  f.write(songinfo.to_json)
end
if trigger == 'songstart' 
    system('cd ${homedir}/.config/pianobar && notifier clearPlaying && notifier')
elsif trigger == 'userlogin'
    system('notifier login')
end
`,
    run = file => {
        const noti = homedir + '/.config/pianobar/pianobarNotify.rb'

        const logger = logToFile( noti )
        logger.log( text( { homedir: homedir } ) )
        return new Promise( function ( resolve ) {
            logger.makeExecutable( function () {
                resolve( true )
            } )
        } )

    }
if ( !module.parent ) {
    youSure( { message: 'Are you sure that you want to overwrite the script that pianobar calls?' }, () => run() )
}
module.exports = file => {
    return youSure( { message: 'Are you sure that you want to overwrite the script that pianobar calls?' }, () => run() )
}
module.exports.run = run
