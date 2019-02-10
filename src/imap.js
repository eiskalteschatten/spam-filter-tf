'use strict';

const imaps = require('imap-simple');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('jfio4j39fj4IFJ$($#FJjskjri3ou48oi3nvmk.JFKIJ$(#FJKdsnfio4u8o3');

const accountConfig = require('../account');

const { checkForSpam } = require('./spam');

class ImapConnection {
    async setupConnection(watchForSpam = false) {
        console.log('Setting up connection to the IMAP server...');

        try {
            const config = {
                ...accountConfig.imapSimple,
                imap: {
                    ...accountConfig.imapSimple.imap,
                    password: cryptr.decrypt(accountConfig.imapSimple.imap.password)
                },
                onerror: error => console.error('There was an error connecting to the IMAP server:\n', error),
                onend: () => console.log('The connection to the IMAP server has ended.')
            };

            if (watchForSpam) {
                config.onmail = async () => {
                    const searchCriteria = ['UNSEEN'];

                    const fetchOptions = {
                        bodies: [''],
                        markSeen: false,
                        struct: true
                    };

                    const messages = await this.connection.search(searchCriteria, fetchOptions);
                    checkForSpam(messages);
                };
            }

            this.connection = await imaps.connect(config);

            console.log('Connected to the IMAP server.');

            return this.connection;
        }
        catch(error) {
            console.error('There was an error connecting to the IMAP server:\n', error);
        }
    }

    async openInbox() {
        await this.connection.openBox('INBOX');
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = ImapConnection;
