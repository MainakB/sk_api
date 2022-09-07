const express = require("express");
const router = express.Router();

const { Validator } = require("express-json-validator-middleware");
const { jobCompletedSchema } = require("../../schemas");

const { validate } = new Validator({ useDefaults: true });
const { produceEvents } = require("../../kafka/producer");
const { kfSchema } = require("../../kafka/schemas");
const { genericUtils } = require("../../utils");

router.post(
  "/complete",
  validate({ body: jobCompletedSchema }),
  async (req, res, next) => {
    try {
      const {
        api_url,
        tenant_name,
        app_version,
        browser_name,
        type,
        team,
        metrics,
      } = req.body;
      if (metrics) {
        const topic_updateWorkspace = "varis.papyrus.insert.workspace";
        await res.sendStatus(201);
        produceEvents(
          topic_updateWorkspace,
          {
            api_url,
            tenant_name,
            app_version: app_version || null,
            browser_name: browser_name || null,
            type: type || null,
            team,
            retry: 0,
            kfKey: genericUtils.crypt("timestamp", Date.now().toString()),
          },
          kfSchema.kfJobCompletedSchema
        );
      } else {
        await res.sendStatus(200);
      }
    } catch (err) {
      next(genericUtils.handleException(req, err, 500));
    }
  }
);

router.get("/getpid", async (req, res, next) => {
  try {
    const os = require("os");
    res.status(200).send(`Pid is : ${os.hostname()}`);
  } catch (err) {
    next(genericUtils.handleException(req, err, 500));
  }
});

router.post("/*", async (req, res) => {
  res.status(404).send("The URL you are trying to reach does not exist.");
});

router.get("/*", async (req, res) => {
  res.status(404).send("The URL you are trying to reach does not exist.");
});

module.exports = router;
