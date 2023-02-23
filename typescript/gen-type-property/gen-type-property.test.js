const genTypeProperty = require("./gen-type-property");

const typeKey = "key";
const propertyValue = "value";

describe("genUnion()", () => {
  it("generates a typescript property", () => {
    const isRequired = true;
    const isNullable = false;

    const result = genTypeProperty("key", isRequired, isNullable, "string");

    const expected = `'key': string;`;

    expect(result).toEqual(expected);
  });

  it("generates a nullable typescript property", () => {
    const isRequired = true;
    const isNullable = true;

    const result = genTypeProperty("key", isRequired, isNullable, "string");

    const expected = `'key': string | null;`;

    expect(result).toEqual(expected);
  });

  it("generates an optional typescript property", () => {
    const isRequired = false;
    const isNullable = false;

    const result = genTypeProperty("key", isRequired, isNullable, "string");

    const expected = `'key'?: string;`;

    expect(result).toEqual(expected);
  });

  it("generates an optional & nullable typescript property", () => {
    const isRequired = false;
    const isNullable = true;

    const result = genTypeProperty("key", isRequired, isNullable, "string");

    const expected = `'key'?: string | null;`;

    expect(result).toEqual(expected);
  });

  it("generates a description", () => {
    const isRequired = true;
    const isNullable = false;

    const result = genTypeProperty(
      "key",
      isRequired,
      isNullable,
      "string",
      "description"
    );

    const expected = `\n/* description */\n'key': string;`;

    expect(result).toEqual(expected);
  });
});
