# Tono-Yamazaki-Maekawa

This repository is a package for an `npm`/Node.js containing the data in Y. Tono, M. Yamazaki, and K. Maekawa, *A Frequency Dictionary of Japanese* (Routledge, 2013; [publisher](https://www.routledge.com/A-Frequency-Dictionary-of-Japanese/Tono-Yamazaki-Maekawa/p/book/9780415610131), [Google Books](https://books.google.com/books?id=7rNlAgAAQBAJ)), containing the top 5000 words in Japanese.

It contains a Node.js module which imports a JSON file `tono.json` which is generated from `tono.tsv` (a tab-separated file) by the `tsv2json.js` script.

We beg that this repository to be considered fair use.

## Usage

`$ npm install --save git://github.com/fasiha/tono-yamazaki-maekawa.git`

Then, in JavaScript, `var tono = require('tono-yamazaki-maekawa')` will contain a 5000-long array of objects.

## Meaning of TSV columns

**Readings** Hiragana or katakana or roumaji (English, there’s a few of these!) characters: how to pronounce the word. Multiple variants separated by `/`.

**English** Tono et al.’s notes in English on meaning, including parts of speech and glosses.

**Kanji** Optional: written form of the word using kanji (this is what’s provided by Tono, et al.). Multiple variants separated by `/`.

**Roumaji** Tono, et al.’s romanized pronunciation (the `Readings` column was automatically converted from this, so please notify me of errors).

**Tono #** Number between 1 and 5000.

**Freq. per mil.** Normalized frequency (occurrences per million words)

**Dispersion** Number between 0 and 1 indicating how universal the word is. Two words can have near-equal frequency of occurrence but have very different dispersions if one occurs in nearly all texts (dispersion close to 1) while another does not (lower than 1). Example: <ruby>事<rt>こと</rt></ruby> has normalized frequency 8747 and dispersion 0.96. Compare to えー (or ええ), an interjection meaning “whaaat?”, with normalized frequency 8636 and dispersion 0.07. Averaged over millions of documents, both occur approximately the same number of times but えー, a spoken word, is frequently omitted from many documents—it has low dispersion.

**Register star** Optional. The top *fifty* words in five registers are marked in this column, specifically:
- BK: books
- WB: web
- OF: official documents
- NM: newspapers and magazines
- SP: spoken (only forty-seven, not fifty, words marked for this register—due to errors?)

## JavaScript/JSON fields

“Readings” → `readings`

“English” → `meaning`

“Kanji” → `kanjis`

“Roumaji” → `roumaji`

“Tono #” → `num`

“Freq. per mil.” → `freq`

“Dispersion” → `disp`

“Register star” → `register`
