const homedir = require( 'homedir' ),
    run = ( { appIcon = '~/.config/pianobar/PandoraIco.png' } ) => `
#!/usr/bin/ruby
require 'json'
trigger = ARGV.shift
appIcon = "${appIcon}"
songinfo = {}
STDIN.each_line { |line| songinfo.store(*line.chomp.split('=', 2))}
File.open("${homedir()}/.config/pianobar/cur.json","w") do |f|
  f.write(songinfo.to_json)
end
if trigger == 'songstart' 
	system('cd ~/.config/pianobar && node index.js clearPlaying && node index.js')
elsif trigger == 'userlogin'
	system('terminal-notifier -title "Pianobar Started" -message "Welcome back" -group "Pianobar" -appIcon "#{appIcon}"')
end
`
if ( !module.parent ) {
    run()
}
module.exports = run
