const { genTypeValue, genTypeBody} = require('../gen-type-body')
const genEnumBody = require('../gen-enum-body')

function fitsTsInterface (definition) {
  return definition.type === 'object'
}

function getTypeKeyword (typeDefinition) {
  if (typeDefinition.enum) { return 'enum' }

  if (fitsTsInterface(typeDefinition)) { return 'interface' }

  return 'type'
}

function genType (name, definition) {
  const typeKeyword = getTypeKeyword(definition)

  switch (typeKeyword) {
    case 'enum': {
      const body = genEnumBody(definition)

      return (
        `enum ${name} = {
          ${body}
        }`
      )
    }

    case 'interface': {
      const body = genTypeBody(definition)

      return (
        `interface ${name} {
          ${body}
        }`
      )
    }

    case 'type': {
      const type = genTypeValue(definition)

      return `type ${name} = ${type}`
    }
  }
}

module.exports = genType
