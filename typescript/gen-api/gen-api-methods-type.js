const ApiMethodTypeName = "ApiMethod";

/**
 * In strict mode we'll be creating a discriminating
 * union type using the available OpenAPI HTTP methods.
 * Else we default to "string"
 */
const genApiMethodsType = (strict = false) => {
  const apiMethods = strict ? `'get' | 'post' | 'put' | 'delete'` : "string";
  const apiMethodsType = `export type ${ApiMethodTypeName} = ${apiMethods}`;

  return apiMethodsType;
};

module.exports = {
  genApiMethodsType,
  ApiMethodTypeName,
};
