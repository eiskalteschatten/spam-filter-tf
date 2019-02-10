'use strict';

const accountConfig = require('../../account');
const hamFolders = accountConfig.folders.ham;

module.exports = async () => {
    console.log('Training ham on the following folders:', JSON.stringify(hamFolders));

    try {
        const ImapConnection = require('../imap');
        const allMessages = [];
        const imapConnection = new ImapConnection();
        const connection = await imapConnection.setupConnection();

        for (const folder of hamFolders) {
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
