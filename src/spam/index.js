'use strict';

const checkForSpam = require('./checkForSpam');
const trainSpam = require('./trainSpam');
const trainHam = require('./trainHam');

module.exports = {
    checkForSpam,
    trainSpam,
    trainHam
};
