const shared = require( './shared' ),
    logToFile = shared.logToAFile,
    readFile = shared.readFile,
    del = require( 'del' ),
    execa = require( 'execa' ),
    libaoLoc = '/usr/local/Library/Formula/libao.rb',
    folder = libaoLoc.split( '/' ).slice( -1 ).join( '/' ),
    youSure = require( './youSure' ),
    touch = require( 'touch' ),
    run = () => del( libaoLoc ).catch( a => a ).then( () => {
        return readFile( 'libaoFix.txt' ).then( data => {

            return Promise.resolve( shared.makeDir( folder ) )
                .then( new Promise( function ( resolve, reject ) {
                    touch( libaoLoc, {}, function () {
                        resolve()
                    } )
                } ) )
                .then( () => { logToFile( libaoLoc ).log( data ) } ).then( () => {
                    execa( 'brew', [ 'uninstall', '--ignore-dependencies', 'libao' ] )
                } )
                .catch( shared.err( "Brew Remove" ) )
                .then( () => {
                    return execa( 'brew', [ 'install', 'libao' ] )
                } )
                .catch( shared.err( "Libao" ) ).catch( a => { console.log( a ) } )

        } )
    } )


if ( !module.parent ) {
    run()
}
module.exports = () => {
    return youSure( { message: 'You sure you want to fix Libao?' }, run )
}
module.exports.run = run
