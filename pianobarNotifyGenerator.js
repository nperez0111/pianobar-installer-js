const homedir = require( 'homedir' )(),
    youSure = require( './youSure' ),
    loadJson = require( 'load-json-file' ),
    logToFile = require( './shared' ).logToAFile,
    execa = require( 'execa' ),
    text = ( { appIcon = homedir + '/.config/pianobar/PandoraIco.png' } ) => `
#!/usr/bin/ruby
require 'json'
trigger = ARGV.shift
appIcon = "${appIcon}"
songinfo = {}
STDIN.each_line { |line| songinfo.store(*line.chomp.split('=', 2))}
File.open("${homedir}/.config/pianobar/cur.json","w") do |f|
  f.write(songinfo.to_json)
end
if trigger == 'songstart' 
	system('cd ${homedir}/.config/pianobar && node index.js clearPlaying && node index.js')
elsif trigger == 'userlogin'
	system('terminal-notifier -title "Pianobar Started" -message "Welcome back" -group "Pianobar" -appIcon "#{appIcon}"')
end
`,
    run = file => {
        const noti = homedir + '/.config/pianobar/pianobarNotify.rb'

        loadJson( file )
            .then( settings => text( settings.icon ) )
            .then( data => {
                return logToFile( noti ).log( data )
            } ).then( () => {
                execa( 'chmod', [ '+x', noti ] )
            } )
    }
if ( !module.parent ) {
    run( 'settings.json' )
}
module.exports = file => {
    return youSure( { message: 'Are you sure that you want to overwrite the script that pianobar calls?' }, () => run( 'settings.json' ) )
}
module.exports.run = run
