const prettier = require("prettier");
const { pipe, join, map } = require("ramda");

const spread = require("../utils/spread");
const genApiTypes = require("./gen-api/gen-api-types");
const genType = require("./gen-type");

const genTypes = pipe(
  (schemas) => Object.entries(schemas).map((entries) => [...entries, schemas]),
  map(pipe(spread(genType), (type) => `export ${type}`)),
  join("\n\n")
);

function typescript(swaggerJson) {
  const { components: { schemas } = {}, paths } = swaggerJson;

  if (!schemas) return console.log("your schemas property is empty");

  const types = genTypes(schemas);
  const apiTypes = genApiTypes(schemas, paths);

  const prettified = prettier.format([types, apiTypes].join("\n\n"), {
    parser: "typescript",
  });

  return prettified;
}

module.exports = typescript;
