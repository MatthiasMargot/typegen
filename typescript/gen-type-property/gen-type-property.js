function genTypeProperty (typeKey, required, value, description) {
  const requiredSymbol = required ? '' : '?'

  return `${description ? `\n/* ${description} */\n` : ''}'${typeKey}'${requiredSymbol}: ${value};`
}

module.exports = genTypeProperty
