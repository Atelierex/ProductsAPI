const con = require('../../mySQL/mySQL.js');

const initialize = (jsonData, database) => {
  queryString = `INSERT INTO ${database} (${jsonData}) VALUES ?`;
  var parsedData = [];
  const fieldLength = jsonData.length;
  return {queryString, fieldLength, parsedData};
};

const insert = (queryString, parsedData) => {
  con.query(queryString, [parsedData], (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      console.log(rows);
    }
  });
  return true;
};

const features = (jsonData, database) => {
  const {queryString, fieldLength, parsedData} = initialize(jsonData[0], database);
  for (var i = 1; i < jsonData.length; i++) {
    if (!jsonData[i].includes('null') && jsonData[i].length === fieldLength) {
      parsedData.push(jsonData[i]);
    }
  }
  return insert(queryString, parsedData);
};

const product = (jsonData, database) => {
  const {queryString, fieldLength, parsedData} = initialize(jsonData[0], database);
  for (var i = 1; i < jsonData.length; i++) {
    if (jsonData[i].length === fieldLength) {
      jsonData[i][5] = jsonData[i][5].replace('$', '');
      parsedData.push(jsonData[i]);
    }
  }
  return insert(queryString, parsedData);
};

const related = (jsonData, database) => {
  const {queryString, fieldLength, parsedData} = initialize(jsonData[0], database);
  for (var i = 1; i < jsonData.length; i++) {
    if (jsonData[i].length === fieldLength) {
      parsedData.push(jsonData[i]);
    }
  }
  return insert(queryString, parsedData);
};

const styles = (jsonData, database) => {
  const {queryString, fieldLength, parsedData} = initialize(jsonData[0], database);
  for (var i = 1; i < jsonData.length; i++) {
    if (!jsonData[i].includes('null') && jsonData[i].length === fieldLength) {
      jsonData[i][3] = jsonData[i][3].replace('$', '');
      jsonData[i][4] = jsonData[i][4].replace('$', '');
      parsedData.push(jsonData[i]);
    }
  }
  return insert(queryString, parsedData);
};

const photos = (jsonData, database) => {
  jsonData[0][3] = jsonData[0][3].replace('"', '');
  const {queryString, fieldLength, parsedData} = initialize(jsonData[0], database);
  for (var i = 1; i < jsonData.length; i++) {
    if (!jsonData[i].includes('null') && !jsonData[i].includes('') && jsonData[i].length === fieldLength) {
      parsedData.push(jsonData[i]);
    }
  }
  for (var i = 0; i < parsedData.length; i += 100000) {
    console.log('Calling on ', i);
    insert(queryString, parsedData.slice(i, i + 100000 - 1 ));
  }
};

module.exports.features = features;
module.exports.product = product;
module.exports.related = related;
module.exports.styles = styles;
module.exports.photos = photos;