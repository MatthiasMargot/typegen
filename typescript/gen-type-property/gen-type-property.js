const typeAliases = require('../../type-aliases')

function genTypeProperty (typeKey, required, value) {
  const requiredSymbol = required ? '' : '?'

  const typeValue =
    typeAliases.ts[value]
      ? typeAliases.ts[value]
      : value

  return `'${typeKey}'${requiredSymbol}: ${typeValue};`
}

module.exports = genTypeProperty
