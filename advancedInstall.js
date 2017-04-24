const execa = require( 'execa' ),
    shared = require( './shared' ),
    log = require( './debug' ),
    pLog = a => b => log( a ),
    homedir = require( 'homedir' ),
    path = homedir() + '/.config/pianobar',
    youSure = require( './youSure' ),
    simple = require( './index' ),
    notifyGen = require( './pianobarNotifyGenerator' ),
    run = () => {
        return notifyGen()
            .then( pLog( "Notification Generation complete..." ) )
            .then( () => {
                const dir = 'temp'
                shared.makedirIfNotExists( dir )
            } ).then( () => {
                return execa( 'open', [ '-b', 'com.apple.systempreferences', '/System/Library/PreferencePanes/Keyboard.prefPane' ] )
            } ).then( () => {
                log( `


Setup of keyboard shortcuts complete, likely will require a reboot.

1) Go to Shortcuts > Services
2) Scroll to General at the bottom
3) Select the shortcuts you want for each combination.
4) Reboot
5) Re-enable the shortcuts by:
 5b) go to Finder
 5c) in the menu bar click the word Finder 
 5d) Go to Services 
 5e) Click each shortcut you would like to use


This enables them to be used throughout the system.

This can be used in any open program, if the shortcut conflicts with a program shortcut.

Simply go to the app name at the top bar > Services and control pianobar through there.

Successfully Installed Shortcuts!` )
            } )

    }


if ( !module.parent ) {
    youSure( {
        message: "Would you like to run the Simple Installer first?",
        default: false
    }, simple ).then( a => {
        run()
    } )
}

module.exports = run
