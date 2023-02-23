const genTypeBody = require("../gen-type-body");
const genEnumBody = require("../gen-enum-body/gen-enum-body");

function getTypeKeyword(typeDefinition) {
  if (typeDefinition.enum) return "enum";
  return "type";
}

function genType(typeKey, typeDefinition, schemas) {
  const typeKeyword = getTypeKeyword(typeDefinition);
  const isEnum = typeKeyword === "enum";

  const typeBody = isEnum
    ? genEnumBody(typeDefinition)
    : genTypeBody(typeDefinition, schemas);

  const typeName = typeKey;

  return `${typeKeyword} ${typeName} ${isEnum ? "" : "="} { ${typeBody} }`;
}

module.exports = genType;
