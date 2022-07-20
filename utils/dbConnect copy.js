// const pgCon = require("pg");

// pgCon.types.setTypeParser(pgCon.types.builtins.INT8, (value) => {
//   return parseInt(value);
// });

// pgCon.types.setTypeParser(20, (val) => parseInt(val));

// pgCon.types.setTypeParser(pgCon.types.builtins.FLOAT8, (value) => {
//   return parseFloat(value);
// });

// pgCon.types.setTypeParser(pgCon.types.builtins.NUMERIC, (value) => {
//   return parseFloat(value);
// });

// let config = {
//   host:
//     process.env["NODE_ENV"] === "development"
//       ? process.env.PGHOST_DEV || "postgres"
//       : process.env.PGHOST_PROD,
//   port: process.env.PGPORT,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
//   idleTimeoutMillis: 30000,
//   max: 25,
//   client_encoding: process.env.CLIENTENCODING,

// };

// const connectionPool = new pgCon.Pool(config);

// module.exports = connectionPool;
