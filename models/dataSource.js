const { DataSource } = require('typeorm');

const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
  type: 'sqlite',
  database: './market_clone.db',
});

module.exports = { appDataSource };
