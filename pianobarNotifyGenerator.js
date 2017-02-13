const homedir = require( 'homedir' )(),
    youSure = require( './youSure' ),
    loadJson = require( 'load-json-file' ),
    logToFile = require( './shared' ).logToAFile,
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
    run = () => {
        loadJson( 'settings.json' )
            .then( settings => text( settings.icon ) )
            .then( data => {
                return logToFile( homedir + '/.config/pianobar/pianobarNotify.rb' ).log( data )
            } )
    }
if ( !module.parent ) {
    run()
}
module.exports = () => {
    return youSure( { message: 'Are you sure that you want to overwrite the script that pianobar calls?' }, run )
}
module.exports.run = run
