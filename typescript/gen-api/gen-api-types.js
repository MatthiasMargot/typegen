const { genApiMethodsType } = require("./gen-api-methods-type");
const { genApiResponseType } = require("./gen-api-response-type");
const { genApiRequestType } = require("./gen-api-request-type");
const genTypeBody = require("../gen-type-body");

const genApiTypes = (schemas, paths) => {
  const apiMethods = genApiMethodsType(false); /* default to non-strict mode */

  const apiPathTypes = Object.entries(paths)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([path, methods]) => ({
      path: path.replace(/({.*?}) */g, "${string}").replace(/^\//, ""),
      methods: Object.entries(methods).map(([method, def]) => {
        const res = def.responses["200"];
        const props = res["content"]["application/json"]["schema"];
        const bodyProps =
          def.requestBody?.["content"]?.["application/json"]?.["schema"] ??
          null;

        return {
          method,
          res: genTypeBody(props, schemas, false),
          body:
            bodyProps !== null
              ? genTypeBody(bodyProps, schemas, false, true)
              : "never",
        };
      }),
    }));

  const apiResponse = genApiResponseType(apiPathTypes);
  const apiRequest = genApiRequestType(apiPathTypes);

  return [apiMethods, apiResponse, apiRequest].join("\n\n");
};

module.exports = genApiTypes;
