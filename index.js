const inquirer = require( 'inquirer' ),
    commandExists = require( 'command-exists' ),
    del = require( 'del' ),
    execa = require( 'execa' ),
    shared = require( './shared' ),
    logToFile = shared.logToAFile,
    readFile = shared.readFile
