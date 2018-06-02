// Update with your config settings.

const settings = require("./settings.json");

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: settings.database,
      user: settings.user,
      password: settings.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/db/migrations"
    },
    seeds: {
      directory: __dirname + "/db/seeds"
    }
  }
};
