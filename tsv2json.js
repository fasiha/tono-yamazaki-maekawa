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

// Split up someting like `[格;かっ][好;こう][良;よ]い` to:
//   `{raws: ["格好良い"], furigana: ["[格;かっ][好;こう][良;よ]い"]}`
function cleanKanji(s) {
  return s.replace(/\[([^;]+);[^\]]+\]/g, (_, match) => match);
}
function dedupe(v) { return Array.from(new Set(v)); }
var db = JSON.parse(fs.readFileSync('full.json'));
function cleanKanjis(v, readings) {
  if (v.length === 0) {
    return [];
  }
  if (v.length > 1) {
    return {raw : dedupe(v.map(cleanKanji)), furigana : v};
  }
  // v.length === 1
  if (readings.length > 1) {
    return {raw : dedupe(v.map(cleanKanji)), furigana : v};
  }
  var r = readings[0].replace(/\s/g, '');
  if (!(db[v[0]] && db[v[0]][r])) {
    console.log('EEeek', v, readings);
  }
  return {raw : v, furigana : []};
}

var rowsobj = rows.map(v => ({
                         readings : v[0],
                         meaning : v[1],
                         kanjis : cleanKanjis(v[2], v[0]),
                         roumaji : v[3],
                         num : +v[4],
                         freq : +v[5],
                         disp : +v[6],
                         register : v[7] || ''
                       }));

fs.writeFileSync('tono.json', JSON.stringify(rowsobj, null, 1));
