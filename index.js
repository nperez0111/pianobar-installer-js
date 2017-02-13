const inquirer = require( 'inquirer' ),
    commandExists = require( 'command-exists' ),
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
    run = () => {
        commandExists( 'pianobar' ).catch( () => {
                //pianobar doesn't exist so lets install it
                commandExists( 'brew' ).catch( () => {
                    //brew doesn't exists so lets install it
                    return execa( '/usr/bin/ruby', [ '-e', '"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"' ] ).catch( err( 'Brew' ) )
                } ).then( () => {
                    //brew is installed so let's do it
                    return brew( [ 'update' ] )
                        .catch( err( 'brew update' ) )
                        .then( brew( [ 'install', 'pianobar' ] ) )
                        .catch( err( 'Pianobar' ) )
                } ) )
        } ).then( () => {
        //pianobar exists lets keep going
        makedirIfNotExists( path )
        config()
    } )
}
if ( !module.parent ) {
    run()
}
module.exports = run
