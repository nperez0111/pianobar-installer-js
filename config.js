const inquirer = require( 'inquirer' ),
    homedir = require( 'homedir' ),
    path = homedir() + '/.config/pianobar',
    shared = require( './shared' ),
    del = require( 'del' ),
    logToFile = shared.logToAFile,
    questions = [ {
        type: 'input',
        name: 'username',
        message: 'Input your username to automatically login to pandora'
    }, {
        type: 'password',
        name: 'password',
        message: 'Input your password to automatically login to Pandora'
    }, {
        type: 'confirm',
        default: 'yes',
        name: 'actuallyAutostart',
        message: 'Do you want to have pianobar on startup play a station you select?'
    }, {
        type: 'input',
        name: 'autostart',
        default: '814524665525141882',
        message: `
The autostart station can be found by either:
 1) Running pianobar pressing 's' to change the station to the station you would like to auto start.
 2) Then note the number that shows next to said station.

OR

 1) By going into the web player select the station you would like to autostart
 2) note the numbers at the end of the URL

Input an autostart station for Pandora to automatically play on startup.`,
        when: ans => ans.actuallyAutostart
    } ],
    text = ( { username, password, autostart } ) => `
user = ${username}
password = ${password}
autostart_station = ${autostart||'814524665525141882'}
format_nowplaying_song = [93m%t[0m, by: [93m%a[0m on the album: [96m%l[0m [91m%r[0m%@%s
format_nowplaying_station = Now Playing "[95m%n[0m" [90m(%i)[0m
format_list_song = %i) %a - [92m%t[0m%r
format_msg_info = [97m(i) [0m%s
format_msg_nowplaying = [36m>[0m  %s
format_msg_time = [90m#   [97m%s[0m
format_msg_err = [90m/!\[0m %s
format_msg_question = [97m[?][0m %s
format_msg_debug = [90m%s[0m
event_command = ~/.config/pianobar/pianobarNotify.rb`,
    run = () => {
        return inquirer.prompt( questions ).then( answers => {
            return del( path + '/config' ).catch( a => a ).then( () => {
                return logToFile( path + '/config' ).log( text( answers ) )
            } )
        } )
    }
if ( !module.parent ) {
    run()
}
module.exports = run
