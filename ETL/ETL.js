const csvParser = require('./utilities/csvParser.js');
const transferToSQL = require('./utilities/transferToSQL.js');

const baseDir = './originalData/';

csvParser.readCSV(`${baseDir}features.csv`, transferToSQL.features, 'features');
csvParser.readCSV(`${baseDir}product.csv`, transferToSQL.product, 'product');
csvParser.readCSV(`${baseDir}related.csv`, transferToSQL.related, 'related');
csvParser.readCSV(`${baseDir}styles.csv`, transferToSQL.styles, 'styles');
csvParser.fixCSV(`${baseDir}photos.csv`, transferToSQL.photos, 'photos');