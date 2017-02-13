const inquirer = require( 'inquirer' ),
    questions = [ {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: [ {
            key: 'l',
            name: 'Fix Libao',
            value: 'libao'
        }, {
            key: '',
            name: 'Write Config file for Pianobar (User,Pass,AutoStart Station)',
            value: 'config'
        } ]
    } ],
    fixLibao = require( './libaoFix' ),
    config = require( './config' ),
    obj = {
        libao: fixLibao,
        config: config
    },
    run = () => {
        inquirer.prompt( questions ).then( answers => {
            obj[ answers.menu ]().then( () => {
                inquirer.prompt( [ {
                    type: 'confirm',
                    message: 'Would you like to perform another action?',
                    default: false,
                    name: 'ret'
                } ] ).then( ans => {
                    if ( ans.ret ) {
                        run()
                    }
                } )
            } )
        } )
    }
if ( !module.parent ) {
    run()
}
module.exports = run
