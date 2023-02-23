function genTypeProperty(typeKey, required, nullable, value, description) {
  const orNullSymbol = nullable ? " | null" : "";
  const requiredSymbol = required ? "" : "?";

  return `${
    description ? `\n/* ${description} */\n` : ""
  }'${typeKey}'${requiredSymbol}: ${value}${orNullSymbol};`;
}

module.exports = genTypeProperty;
