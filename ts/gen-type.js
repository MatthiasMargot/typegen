const genTypeBody = require('./gen-type-body')
const genEnumBody = require('./gen-enum-body')

function fitsTsInterface (definition) {
  /*
   * TODO: logic for determining ts keyword 'type' vs 'interface'
   * */
  return true
}

function genType (typeName, typeDefinition) {
  if (typeDefinition.enum) {
    const enumBody = genEnumBody(typeDefinition)
    return (
      `enum ${typeName} {
        ${enumBody}
      }`
    )
  }


  const typeKeyWord =
    fitsTsInterface(typeDefinition)
      ? 'interface'
      : 'type'

  const typeBody = genTypeBody(typeDefinition)

  return (
    `${typeKeyWord} ${typeName} {
      ${typeBody}
    }`
  )
}

module.exports = genType
