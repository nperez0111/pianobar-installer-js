const shared = require( './shared' ),
    logToFile = shared.logToAFile,
    readFile = shared.readFile,
    del = require( 'del' ),
    execa = require( 'execa' ),
    libaoLoc = '/usr/local/Library/Formula/libao.rb',
    run = () => {
        console.log( libaoLoc )
        del( libaoLoc ).then( () => {
            readFile( 'libaoFix.txt' ).then( data => {
                logToFile( libaoLoc ).log( data )
                execa( 'brew', [ 'remove', 'libao' ] ).then( () => {
                    execa( 'brew', [ 'install', 'libao' ] )
                } )

            } )
        } )
    }

if ( !module.parent ) {
    run()
}
module.exports = run
