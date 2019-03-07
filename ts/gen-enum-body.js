function genEnumBody (definition) {
  return definition.enum.reduce(
    (concatenation, enumEntry) => {
      const enumProperty = `${enumEntry} = '${enumEntry}',`

      return concatenation + enumProperty
    },
    '',
  )
}

module.exports = genEnumBody
