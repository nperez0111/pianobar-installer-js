const inquirer = require( 'inquirer' )

module.exports = ( obj, cb ) => inquirer.prompt( [ Object.assign( {
    type: 'confirm',
    default: true,
    name: 'fix'
}, obj ) ] ).then( ans => {
    if ( ans.fix ) {
        return cb()
    }
} )
