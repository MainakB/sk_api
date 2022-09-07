const avro = require("avsc");

const kfJobCompletedSchema = avro.Type.forSchema({
  type: "record",
  fields: [
    { name: "api_url", type: "string" },
    { name: "tenant_name", type: "string" },
    { name: "app_version", type: ["string", "null"] },
    { name: "browser_name", type: ["string", "null"] },
    { name: "type", type: ["string", "null"] },
    { name: "team", type: "string" },
    { name: "retry", type: ["null", "int"], default: null },
    { name: "kfKey", type: "string" },
  ],
});

module.exports = {
  kfJobCompletedSchema,
};
