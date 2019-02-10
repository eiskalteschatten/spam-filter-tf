'use strict';

const bcrypt = require('bcrypt-nodejs');

const password = process.argv[2];
const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

console.log(hash);
