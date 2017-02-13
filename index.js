const commandExists = require( 'command-exists' ),
    del = require( 'del' ),
    execa = require( 'execa' ),
    shared = require( './shared' ),
    log = require( './debug' ),
    logToFile = shared.logToAFile,
    readFile = shared.readFile,
    brew = execa.bind( execa, 'brew' ),
    homedir = require( 'homedir' ),
    path = homedir() + '/.config/pianobar',
    config = require( './config' ),
    err = shared.err,
    makedirIfNotExists = shared.makedirIfNotExists,
    youSure = require( './youSure' ),
    advancedInstall = require( './advancedInstall' ),
    run = () => {
        commandExists( 'pianobar' ).catch( () => {

            log( `Pianobar doesn't exist so let's install it...` )

            commandExists( 'brew' ).catch( () => {

                log( `Brew doesn't exists so lets install it...` )

                return execa( '/usr/bin/ruby', [ '-e', '"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"' ] ).catch( err( 'Brew' ) )
            } ).then( () => {

                log( `Brew is installed, So let's update it and install pianobar...` )

                return brew( [ 'update' ] )
                    .catch( err( 'brew update' ) )
                    .then( brew( [ 'install', 'pianobar' ] ) )
                    .catch( err( 'Pianobar' ) )
            } )
        } ).then( () => {

            log( `Pianobar exists, let's keep going...` )

            makedirIfNotExists( path )

            return config()

        } ).then( () => {
            log( `Going to make the fifo` )
            return execa( 'mkfifo', [ path + 'ctl' ] )
                .catch( a => {
                    log( "Fifo was most likely already there..." )
                } )
        } ).then( () => {
            return youSure( {
                    message: "Would you like to run the advanced installer to get Notifications and keyboard shortcuts?"
                },
                advancedInstall
            )
        } )
    }
if ( !module.parent ) {
    run()
}
module.exports = run
