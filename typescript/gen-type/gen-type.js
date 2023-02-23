const genTypeBody = require("../gen-type-body");
const genEnumBody = require("../gen-enum-body/gen-enum-body");

function getTypeKeyword(typeDefinition) {
  if (typeDefinition.enum) return "enum";
  return "type";
}

function genType(typeKey, typeDefinition, schemas) {
  const typeKeyword = getTypeKeyword(typeDefinition);

  const typeBody =
    typeKeyword === "enum"
      ? genEnumBody(typeDefinition)
      : genTypeBody(typeDefinition, schemas);

  const typeName = typeKey;

  return `${typeKeyword} ${typeName} { ${typeBody} }`;
}

module.exports = genType;
