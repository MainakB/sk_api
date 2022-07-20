const format = require("pg-format");
const makeDb = require("../../../utils/dbConnect");
const logger = require("../../../utils/logger");

class PgDBService {
  constructor() {}

  async runQuery(query, values) {
    let client;
    let result;
    const startTime = Date.now();
    let endTime;
    try {
      client = await makeDb();
      const queryStr = values ? format(query, values) : format(query);
      console.log("test", client);
      logger.debug(`\nRunning Query : ${queryStr}\n\n`, 4, 0);
      result = await client.query(queryStr);
      logger.debug(`result`, 4, result);
      endTime = Date.now() - startTime;
      logger.debug(`Ending QUERY.`, 4, endTime);
    } catch (err) {
      endTime = Date.now() - startTime;
      logger.debug(`Error in running the query: ${err.stack}`, 4, endTime);
      throw err;
    } finally {
      endTime = Date.now() - startTime;
      logger.debug(`Releasing database client.\n\n`, 4, endTime);
      if (client) {
        await client.close();
        logger.debug(`Succesfuly released database client.\n\n`, 4, endTime);
      }
    }
    return result;
  }

  async runTransaction(querySet) {
    let client;
    let result = [];
    const startTime = Date.now();
    let endTime;
    try {
      client = await makeDb();
      console.log("clientclient", client);
      logger.debug(`\nStarting Transaction : BEGIN`, 4, 0);
      // await client.beginTransaction();
      console.log("Begin now");
      for (let i = 0; i < querySet.length; i++) {
        const queryStr = querySet[i].query;
        console.log("Query now");
        logger.debug(`Running Query : ${queryStr}\n\n`, 4, 0);
        const op = await client.query(queryStr);
        console.log("Query done");
        result.push(op);
      }
      console.log("Commit now");
      // await client.commit();
      endTime = Date.now() - startTime;
      logger.debug(`Ending Transaction : COMMIT`, 4, endTime);
    } catch (err) {
      console.log("erro", err);
      // await client.rollback();
      endTime = Date.now() - startTime;
      logger.debug(
        `Rolling back Transaction with error : ${err.stack}`,
        4,
        endTime
      );
      throw err;
    } finally {
      endTime = Date.now() - startTime;
      logger.debug(`Releasing database client.\n\n`, 4, endTime);
      if (client) {
        await client.close();
        logger.debug(`Succesfuly released database client.\n\n`, 4, endTime);
      }
    }
    return result;
  }
}

module.exports = PgDBService;
