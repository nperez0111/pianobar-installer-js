const fs = require( 'fs' ),
    util = require( 'util' )
module.exports = {
    logToAFile: file => {
        const log_file = fs.createWriteStream( file, { flags: 'w' } )
        return {
            log: function ( line ) {
                log_file.write( util.format( line ) );
            },
            logLine: function ( line ) {
                log_file.write( util.format( line ) + '\n' );
            },
            newLine: function () {
                log_file.write( '\n' )
            }
        }
    },
    readFile: filename => {
        return new Promise( ( resolve, reject ) => {
            fs.readFile( filename, 'utf8', ( err, data ) => {
                if ( err ) {
                    reject( err )
                    return
                }
                resolve( data )
            } )
        } )
    }
}
