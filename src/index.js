'use strict';

const { setupConnection, openInbox } = require('./imap');

async function main() {
    await setupConnection();
    openInbox();
}

main();
