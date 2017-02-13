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
            key: 'c',
            name: 'Write Config file for Pianobar (User,Pass,AutoStart Station)',
            value: 'config'
        }, {
            key: 'p',
            name: 'Write the script that connects Pianobar to the notification system',
            value: 'connect'
        } ]
    } ],
    fixLibao = require( './libaoFix' ),
    config = require( './config' ),
    connect = require( './pianobarNotifyGenerator' ),
    obj = {
        libao: fixLibao,
        config: config,
        connect: connect
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
