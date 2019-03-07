function genUnion (unionArray) {
  return unionArray.map(item => `'${item}'`).join(' | ')
}

module.exports = genUnion
