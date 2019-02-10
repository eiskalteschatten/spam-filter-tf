'use strict';

const ImapConnection = require('./imap');
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
            const imapConnection = new ImapConnection();
            await imapConnection.setupConnection(true);
            await imapConnection.openInbox();
    }
}

main();
