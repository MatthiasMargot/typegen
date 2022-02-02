function genTypeProperty (typeKey, required, value, description) {
  const requiredSymbol = required ? '' : '?'

  return `${description ? `/* ${description} */\n` : ''}'${typeKey}'${requiredSymbol}: ${value};\n`
}

module.exports = genTypeProperty
