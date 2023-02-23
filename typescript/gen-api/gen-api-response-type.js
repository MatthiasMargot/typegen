const { ApiMethodTypeName } = require("./gen-api-methods-type");
const ApiResponseTypeName = "ApiResponse";

/**
 * Generates a generic discriminating union type on the
 * path and api method. This will allow resolving the
 * underlying response type. ie :
 *
 * `ApiResponse<"/v1/get/items", "post">`
 */
const genApiResponseType = (apiPathTypes) => {
  const apiResponseType = `export type ${ApiResponseTypeName}<Path extends string, Method extends ${ApiMethodTypeName}> = ${apiPathTypes
    .map(
      ({ path, methods }) =>
        `Path extends \`${path}\` ? (${methods
          .map(({ method, res }) => `Method extends \`${method}\` ? ${res}`)
          .join(" : ")} : never)`
    )
    .join(" : ")} : any`;

  return apiResponseType;
};

module.exports = {
  genApiResponseType,
  ApiResponseTypeName,
};
