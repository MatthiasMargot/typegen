const genTypeBody = require('../gen-type-body')
const genEnumBody = require('../gen-enum-body/gen-enum-body')

function fitsTsInterface (definition) {
  /*
   * TODO: logic for determining ts keyword 'type' vs 'interface'
   * */
  return true
}

function getTypeKeyword (typeDefinition) {
  if (typeDefinition.enum) { return 'enum' }

  if (fitsTsInterface(typeDefinition)) { return 'interface' }

  return 'type'
}

function genType (typeKey, typeDefinition, schemas) {
  const typeKeyword = getTypeKeyword(typeDefinition)

  const typeBody =
    typeKeyword === 'enum'
      ? genEnumBody(typeDefinition)
      : genTypeBody(typeDefinition, schemas)

  const typeName = typeDefinition.title || typeKey

  return (
    `${typeKeyword} ${typeName} {
      ${typeBody}
    }`
  )
}

module.exports = genType
