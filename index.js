"use strict";

var fs = require('fs');
var data = JSON.parse(fs.readFileSync('tono.json', 'utf8'));

module.exports = data;