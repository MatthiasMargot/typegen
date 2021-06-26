const prettier = require('prettier')
const { pipe, join, map, head, tail, toUpper } = require('ramda')

const spread = require('../utils/spread')
const genType = require('./gen-type')
const httpCodes = require('../http-codes.json')

const capitalize = string => toUpper(head(string)) + tail(string)

const onlyAlphaNumerics = string => {
  const noAlphaNumerics = /[^a-z]/gi

  return string.replace(noAlphaNumerics, '')
}

const getTypeName = path => {
  const pathParamRegex = /{[^}]+}/g

  const pathParamReplacement = 'By'

  const replacePathParam = param =>
    pathParamReplacement + capitalize(onlyAlphaNumerics(param))

  return path
    .replace(pathParamRegex, replacePathParam)
    .split('/')
    .map(capitalize)
    .map(onlyAlphaNumerics)
    .join('')
}

const parsePaths = paths => {
  return Object.entries(paths)
    .map(([ path, pathObject ]) => {
      const methods = Object.entries(pathObject).filter(
        ([ key ]) => [
          'get',
          'put',
          'post',
          'delete',
          'options',
          'head',
          'patch',
          'trace',
        ].includes(key)
      )

      const name = getTypeName(path)

      return methods.map(
        ([ verb, method ]) => {
          return Object.entries(method.responses)
            .filter(([ , response ]) => Boolean(response.content['application/json']))
            .map(
              ([ httpCode, response ]) => {
                const { content: { 'application/json': { schema } } } = response

                const interfaceName = name + capitalize(verb) + httpCodes[httpCode]

                const type = genType(interfaceName, schema)

                return type
              }
            )
        }
      )
    })
      .flat(2)
      
}

const parseSchemas = pipe(
  Object.entries,
  map(spread(genType))
)

function typescript (swagger) {
  const {
    paths,
    components: { schemas } = {}
  } = swagger

  const output = [
    schemas && parseSchemas(schemas),
    paths && parsePaths(paths)
  ]
    .filter(Boolean)
    .flat(1)
    .map(type => `export ${type}`)
    .join('\n\n')

  const prettified = prettier.format(
    output,
    { parser: 'typescript' }
  )

  return prettified
}

module.exports = typescript
