"use strict";

var assert = require('assert');
var fs = require('fs');
var lines = fs.readFileSync('tono.tsv', 'utf8')
                .trim()
                .split('\n')
                .map(s => s.split('\t'));
var headings = lines[0];
var rows = lines.slice(1);

// First and third columns contain variants separated by slashes `/`. Split into
// arrays. Third column can also be an empty string, in which case output `[]`
// rather than `['']`.
rows.forEach(v => v[0] = v[0].split('/'));
rows.forEach(v => v[2] = v[2] === '' ? [] : v[2].split('/'));

var rowsobj = rows.map(v => ({
                         readings : v[0],
                         meaning : v[1],
                         kanjis : v[2],
                         roumaji : v[3],
                         num : +v[4],
                         freq : +v[5],
                         disp : +v[6],
                         register : v[7] || ''
                       }));

fs.writeFileSync('tono.json', JSON.stringify(rowsobj, null, 1));
