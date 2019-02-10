'use strict';

const Imap = require('imap');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('jfio4j39fj4IFJ$($#FJjskjri3ou48oi3nvmk.JFKIJ$(#FJKdsnfio4u8o3');

const config = require('../account');

let imap;

function setupConnection() {
    console.log('Setting up connection to the IMAP server...');

    const accountConfig = {
        ...config.account,
        password: cryptr.decrypt(config.account.password)
    };

    imap = new Imap(accountConfig);

    imap.once('ready', () => {
        console.log('Connected to IMAP server.');


    });

    imap.once('error', error => {
        console.log('There was an error connecting to the IMAP server:', error);
    });

    imap.once('end', function() {
        console.log('The connection to the IMAP server has ended.');
    });

    imap.connect();
}

module.exports = {
    setupConnection,
    getConnection: () => imap
};
