const { ApiMethodTypeName } = require("./gen-api-methods-type");
const ApiRequestTypeName = "ApiRequest";

/**
 * Generates a generic discriminating union type on the
 * path and api method. This will allow resolving the
 * underlying request body type. ie :
 *
 * `ApiRequestTypeName<"/v1/get/items", "post">`
 */
const genApiRequestType = (apiPathTypes) => {
  const apiResponseType = `export type ${ApiRequestTypeName}<Path extends string, Method extends ${ApiMethodTypeName}> = ${apiPathTypes
    .map(
      ({ path, methods }) =>
        `Path extends \`${path}\` ? (${methods
          .map(({ method, body }) => `Method extends \`${method}\` ? ${body}`)
          .join(" : ")} : never)`
    )
    .join(" : ")} : any`;

  return apiResponseType;
};

module.exports = {
  genApiRequestType,
  ApiRequestTypeName,
};
