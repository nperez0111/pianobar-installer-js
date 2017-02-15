const fs = require( 'fs' ),
    util = require( 'util' )
module.exports = {
    logToAFile: ( file ) => {
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
            },
            makeExecutable: function ( cb ) {
                fs.chmod( file, 0755, cb )
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
    },
    err: which => a => {
        log( a )
        throw new Error( `${which} install failed` )
    },
    makedirIfNotExists: dir => {
        if ( !fs.existsSync( dir ) ) {
            fs.mkdirSync( dir );
        }
    },
    makeDir: dir => {
        dir.split( '/' ).reduce( ( prev, cur ) => {
            module.exports.makedirIfNotExists( prev )
            return `${prev}/${cur}`
        } )
    }
}
