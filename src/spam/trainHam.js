'use strict';

const accountConfig = require('../../account');
const hamFolders = accountConfig.folders.ham;

module.exports = () => {
    console.log('Training ham on the following folders:', JSON.stringify(hamFolders));
};
