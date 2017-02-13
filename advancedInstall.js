const execa = require( 'execa' ),
    shared = require( './shared' ),
    log = require( './debug' ),
    pLog = a => b => log( a ),
    homedir = require( 'homedir' ),
    path = homedir() + '/.config/pianobar',
    youSure = require( './youSure' ),
    simple = require( './index' ),
    notifyGen = require( './pianobarNotifyGenerator' ),
    download = require( 'download' ),
    extract = require( 'extract-zip' ),
    del = require( 'del' ),
    url = 'https://raw.githubusercontent.com/nperez0111/pianobar-installer/master/WorkFlows.zip',
    file = url.split( '/' ).slice( -1 ).join( '/' ),
    run = () => {
        return notifyGen()
            .then( pLog( "Notification Generation complete..." ) )
            .then( () => {
                const dir = 'temp'
                shared.makedirIfNotExists( dir )
                download( , dir )
                    .then( () => {
                        return new Promise( ( resolve, reject ) => {
                            extract( `${dir}/${file}`, { dir: dir }, function ( err ) {
                                if ( err ) {
                                    reject( err )
                                } else {
                                    resolve( true )
                                }
                            } )
                        } ).then( () => {
                            return del( `${dir}/${file}` )
                        } )

                    } )
                    .catch( shared.err( "Failed to Download KeyBoard Shortcuts" ) )
                    .then( () => {
                        return execa( 'open', [ '-b', 'com.apple.systempreferences', '/System/Library/PreferencePanes/Keyboard.prefPane' ] )
                    } ).then( () => {
                        log( `
Setup of keyboard shortcuts complete, likely will require a reboot.
Go to Shortcuts > Services > Scroll to General at the bottom, Select the shortcuts you want for each combination.
On Reboot to enable the shortcuts, go to Finder, at the top bar click the word Finder > Services and each shortcut you would like to use, this enables them to be used throughout the system.
This can be used in any program open if the shortcut conflicts with a program shortcut.
Simply go to the app name at the top bar > Services and control pianobar through there.

Successfully Installed Shortcuts!` )
                    } )
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
