#!/usr/bin/env node
/**
 * Merges locales/en.json + locales/ru.json into locales/messages.js (file:// safe).
 * Run from repo root: node locales/build-messages.js
 */
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const ru = JSON.parse(fs.readFileSync(path.join(dir, 'ru.json'), 'utf8'));
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));
const payload = JSON.stringify({ ru, en }, null, 2);
const out = `/**
 * Bundled copy of locales/*.json for environments where fetch() is blocked (e.g. file://).
 * Regenerate: node locales/build-messages.js
 */
window.TMA_I18N = ${payload}
`;
fs.writeFileSync(path.join(dir, 'messages.js'), out, 'utf8');
console.log('Wrote locales/messages.js');
