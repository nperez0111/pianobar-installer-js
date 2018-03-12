const commandExists = require( 'command-exists' ),
    del = require( 'del' ),
    execa = require( 'execa' ),
    shared = require( './shared' ),
    log = require( './debug' ),
    logToFile = shared.logToAFile,
    readFile = shared.readFile,
    brew = execa.bind( execa, 'brew' ),
    mkfifo = execa.bind(execa, 'mkfifo'),
    installBrew = () => execa('/usr/bin/ruby', ['-e', '"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"']),
    homedir = require('homedir')(),
    pianobarConfigPath = path.resolve(homedir, '.config/pianobar'),
    configPath = path.resolve(pianobarConfigPath, 'config'),
    ctlPath = path.resolve(pianobarConfigPath, 'ctl'),
    config = require( './config' ),
    err = shared.err,
    makedirIfNotExists = shared.makedirIfNotExists,
    youSure = require( './youSure' ),
    advancedInstall = require( './advancedInstall' ),
  run = () => {
    log("Checking to see if Pianobar is installed...")
    commandExists('pianobar').catch(() => {

        log(`Pianobar is not installed, So let's install it...`)
        log("Checking to see if Brew is installed...")
        commandExists('brew').catch(() => {

            log(`Brew is not installed, So lets install it...`)

            return installBrew().catch(err('Error installing brew...'))
        }).then(() => {

            log(`Success!\n So, let's update Brew it and install Pianobar...`)

            return brew(['update'])
                .catch(err('brew update failed'))
                .then(() => log("Attempting to install Pianobar"))
                .then(brew(['install', 'pianobar']))
                .then(() => { log("Success!") })
                .catch(err('Pianobar failed to install'))
        })
    }).then(() => {
        //pianobar exists
        log(`Ensuring directory structure...`)

        return makedirIfNotExists(path).then(() => log("Success!")).catch(err("Failed..."))
    }).then(() => {
        log(`Attempting to create FIFO...`)
        return mkfifo(ctlPath)
            .catch(a => {
                log("FIFO is probably already there...")
            }).then(() => {
                log('Success!')
            })
    }).then(() => {
        log("Generating Pianobar config file based off of the following questions...")

        return config()
    }).then( () => {
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
