/**
 Copyright (c) 2018
 Authors: Bohdan Sharipov, Alexey Ulianov, Eskender Memetov, John Calma
 */

// Load the correct configuration file according to the 'NODE_ENV' variable
module.exports = require('./env/' + process.env.NODE_ENV + '.js');