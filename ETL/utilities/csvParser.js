const csv = require('csv-parser');
const fastcsv = require('fast-csv');
const fs = require('fs');
const readline = require('readline');

const readCSV = (filename, callback, dataset) => {
  var lineReader = readline.createInterface({
    input: require('fs').createReadStream(filename)
  });
  lineReader.on('line', function (line) {
    csvStream.write(line + '\n');
  });
  lineReader.on('close', function () {
    csvStream.end();
  });
  let results = [];
  let csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      // callback(results, dataset);
      console.log(results)
    });
};

const fixCSV = (filename, callback, dataset) => {
  var lineReader = readline.createInterface({
    input: require('fs').createReadStream(filename)
  });
  lineReader.on('line', function (line) {
    if (line.slice(-1) !== '"') {
      line += '"';
    }
    csvStream.write(line + '\n');
  });
  lineReader.on('close', function () {
    csvStream.end();
  });
  let results = [];
  let csvStream = fastcsv
    .parse()
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      callback(results, dataset);
    });
};

module.exports.readCSV = readCSV;
module.exports.fixCSV = fixCSV;