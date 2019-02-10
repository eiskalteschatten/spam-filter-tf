'use strict';

const accountConfig = require('../../account');
const spamFolders = accountConfig.folders.spam;

module.exports = () => {
    console.log('Training spam on the following folders:', JSON.stringify(spamFolders));
};
