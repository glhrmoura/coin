const path = require('path');

const AdmZip = require('adm-zip');

const zip = new AdmZip();

zip.addLocalFolder('./src');
zip.writeZip(path.resolve(__dirname, '../dist/coins.zip'));