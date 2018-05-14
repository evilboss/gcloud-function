#!/usr/bin/env node

const shell = require('shelljs');

require('yargs')
    .command({
        command: 'Deploy [name]',
        aliases: ['start:dev'],
        desc: 'Set functionName to deploy',
        builder: yargs => yargs.default('name', 'functionName'),
        handler: (argv) => {
            shell.echo(`Deploying ${argv.name} to local emulator`);
            shell.exec(`./node_modules/@google-cloud/functions-emulator/bin/functions deploy ${argv.name} --trigger-http`);
        },
    })
    .help()
    .argv;
