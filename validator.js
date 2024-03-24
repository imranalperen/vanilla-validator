class Validator {
  static validateDTO(data, schema) {
    const returnData = {};

    if (typeof data !== "object" || typeof schema !== "object") {
      throw new Error("Data and schema must be objects.");
    }

    for (let key in schema) {
      const expectedType = schema[key].type;
      const required = schema[key].required || true;
      let defaultValue;
      if (schema[key].default !== "undefined") {
        defaultValue = schema[key].default;
      }

      if (!(key in data)) {
        if (required && !defaultValue) {
          throw new Error(`Property '${key}' is missing in data.`);
        } else {
          data[key] = defaultValue;
        }
      }

      //? string and number handler
      if (expectedType === "string" || expectedType === "number") {
        returnData[key] = data[key];
        const actualType = typeof data[key];
        if (actualType !== expectedType) {
          throw new Error(
            `Type mismatch for property '${key}': Expected '${expectedType}', got ${actualType}`,
          );
        }
      }
      //? enum handler
      else if (expectedType === "enum") {
        returnData[key] = data[key];
        const expectedEnums = schema[key].enum;
        const actualData = data[key];
        if (!Object.values(expectedEnums).includes(actualData)) {
          throw new Error(
            `Enum mismatch for value '${key}': Expected: Key of one, '${Object.keys(
              expectedEnums,
            )}', got '${actualData}'`,
          );
        }
      }
      //? sub-schema handler
      else if (expectedType === "sub-schema") {
        const subData = Validator.validateDTO(
          data[key].subSchema,
          schema[key].subSchema,
        );
        returnData[key] = { ...subData };
      }
      //? undefined handler
      else {
        throw new Error(`Invalid schema type for property '${key}'`);
      }
    }

    for (let key in data) {
      if (!(key in schema)) {
        throw new Error(`Extra property '${key}' found in data`);
      }
    }

    return returnData;
  }
}

module.exports = { Validator };
