'use strict';

const accountConfig = require('../../account');
const spamFolders = accountConfig.folders.spam;


module.exports = async () => {
    console.log('Training spam on the following folders:', JSON.stringify(spamFolders));

    try {
        const ImapConnection = require('../imap');
        const allMessages = [];
        const imapConnection = new ImapConnection();
        const connection = await imapConnection.setupConnection();

        for (const folder of spamFolders) {
            await connection.openBox(folder);
            const searchCriteria = ['ALL'];

            const fetchOptions = {
                bodies: [''],
                markSeen: false,
                struct: true
            };

            const messages = await connection.search(searchCriteria, fetchOptions);
            allMessages.push(messages);
        }

        connection.end();
    }
    catch(error) {
        throw new Error(error);
    }
};
