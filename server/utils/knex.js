import dotenv from 'dotenv';

export function connect() {
  dotenv.config();
  var databaseConfig;
  if (process.env.ENV === 'development') {
    databaseConfig = require('../knexfile').development;
  } else if (process.env.ENV === 'production') {
    databaseConfig = require('../knexfile').production;
  }
  var knex = require('knex')(databaseConfig);
  return knex;
};
