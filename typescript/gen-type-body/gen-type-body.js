const { join, map, flip } = require("ramda");

const genTypeProperty = require("../gen-type-property/gen-type-property");
const genUnion = require("../gen-union/gen-union");
const arrayHas = require("../../utils/array-has");
const arrayLast = require("../../utils/array-last");
const entries = require("../../utils/entries");
const typeAliases = require("../../type-aliases");

function genTypeValue(property, schemas) {
  const { $ref, items, type } = property;

  if ($ref) {
    const refName = arrayLast($ref.split("/"));
    return refName;
  }

  if (property.enum) return genUnion(property.enum);
  if (type === "array") return `${genTypeValue(items, schemas)}[]`;

  if (type === "object") {
    if (property.allOf) {
      return join(" & ")(map(flip(genTypeValue)(schemas))(property.allOf));
    }

    return `{ ${genTypeBody(property, schemas)} }`;
  }

  return typeAliases.ts[type] ? typeAliases.ts[type] : type;
}

const genTypeBody = (data, schemas, unwrap = true, isPostBodyType = false) => {
  const { properties = {}, allOf, required } = data;

  if (allOf) {
    return join(" & ")(
      map((entry) =>
        entry["$ref"]
          ? genTypeValue(entry, schemas)
          : `{ ${genTypeBody(entry, schemas, true)} }`
      )(allOf)
    );
  }

  if (isPostBodyType) {
    return genTypeValue(data, schemas);
  }

  return `${unwrap ? "" : "{"}${join("")(
    entries(properties).map(([key, property]) =>
      genTypeProperty(
        key,
        required && arrayHas(required, key),
        property.nullable ?? false,
        genTypeValue(property, schemas),
        property.description ?? ""
      )
    )
  )}${unwrap ? "" : "}"}`;
};

module.exports = genTypeBody;
