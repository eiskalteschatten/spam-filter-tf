'use strict';

const Cryptr = require('cryptr');
const cryptr = new Cryptr('jfio4j39fj4IFJ$($#FJjskjri3ou48oi3nvmk.JFKIJ$(#FJKdsnfio4u8o3');

const password = process.argv[2];
const encryptedString = cryptr.encrypt(password);

console.log(encryptedString);
