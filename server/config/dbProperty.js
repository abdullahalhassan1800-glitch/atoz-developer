const Datastore = require('nedb-promises');
const path = require('path');

const db = Datastore.create({
  filename: path.join(__dirname, '..', 'data', 'properties.db'),
  autoload: true,
});

module.exports = db;
