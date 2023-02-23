const { pipe, props, map, join } = require("ramda");

/**
 * Enum types which contain only numbers as
 * enum values will not generate valid TS enums
 * as enum members cannot have numeric names, ie:
 *
 * ```
 * "ResponseCodeSuccess": {
 *      "title": "ResponseCode",
 *      "description": "Body code",
 *      "type": "integer",
 *      "enum": [1000]
 *   }
 * ```
 *
 * should generate the following enum using the
 * title property :
 *
 * ```
 * enum ResponseCodeSuccess {
 *   ResponseCode_1000 = 1000
 * }
 * ```
 */
const genEnumBody = pipe(
  props(["enum", "title", "type"]),
  ([enumValues, title, type]) => {
    return map((entry) =>
      type === "integer"
        ? `${title}_${entry} = ${entry}`
        : `${entry} = '${entry}'`
    )(enumValues);
  },
  join(",")
);

module.exports = genEnumBody;
