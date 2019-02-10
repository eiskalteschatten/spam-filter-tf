'use strict';

const imaps = require('imap-simple');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('jfio4j39fj4IFJ$($#FJjskjri3ou48oi3nvmk.JFKIJ$(#FJKdsnfio4u8o3');

const accountConfig = require('../account');

const { checkForSpam } = require('./spam');

let imapConnection;


async function onmail() {
    const searchCriteria = ['UNSEEN'];

    const fetchOptions = {
        bodies: [''],
        markSeen: false
    };

    const messages = await imapConnection.search(searchCriteria, fetchOptions);
    checkForSpam(messages);
}

function onerror(error) {
    console.error('There was an error connecting to the IMAP server:\n', error);
}

function onend() {
    console.log('The connection to the IMAP server has ended.');
}

async function setupConnection() {
    console.log('Setting up connection to the IMAP server...');

    try {
        const config = {
            ...accountConfig.imapSimple,
            imap: {
                ...accountConfig.imapSimple.imap,
                password: cryptr.decrypt(accountConfig.imapSimple.imap.password)
            },
            onmail,
            onerror,
            onend
        };

        imapConnection = await imaps.connect(config);

        console.log('Connected to the IMAP server.');
    }
    catch(error) {
        console.error('There was an error connecting to the IMAP server:\n', error);
    }
}

async function openInbox() {
    imapConnection.openBox('INBOX');
}

module.exports = {
    setupConnection,
    openInbox,
    getConnection: () => imapConnection
};
