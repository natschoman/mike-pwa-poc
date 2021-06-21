const { readFileSync, writeFileSync } = require('fs');

const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
const versionJson = JSON.parse(readFileSync('public/version.json', 'utf-8'));

versionJson.version = packageJson.version;
writeFileSync('public/version.json', JSON.stringify(versionJson));
