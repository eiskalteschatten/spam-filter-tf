'use strict';

const { setupConnection, openInbox } = require('./imap');
const { trainHam, trainSpam } = require('./spam');

async function main() {
    switch (process.argv[2]) {
        case '--train-ham':
            await trainHam();
            break;
        case '--train-spam':
            await trainSpam();
            break;
        default:
            await setupConnection();
            openInbox();
    }
}

main();
