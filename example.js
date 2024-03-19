const { Validator } = require("./validator");

const schema = { name: { type: "string", required: true } };
const data = { name: "Alperen" };
const result = Validator.validateDTO(data, schema);
console.log(result); // Output: { name: "Alperen" }

const schema4 = { name: { type: "string", default: "John Doe" } };
const data4 = {};
const result4 = Validator.validateDTO(data4, schema4);
console.log(result4); // Output: { name: "John Doe" }

const schema5 = { name: { type: "string", required: true } };
const data5 = { name: 123 };
try {
  Validator.validateDTO(data5, schema5);
} catch (error) {
  console.log(error.message); // Output: Type mismatch for property 'name': Expected 'string', got number
}

const schema6 = { age: { type: "number", required: true } };
const data6 = { age: "twenty-five" };
try {
  Validator.validateDTO(data6, schema6);
} catch (error) {
  console.log(error.message); // Output: Type mismatch for property 'age': Expected 'number', got string
}

const schema7 = {
  address: {
    type: "sub-schema",
    subSchema: { country: { type: "string" }, city: { type: "string" } },
  },
};
const data7 = {
  address: {
    subSchema: { country: "Turkey", city: "Istanbul" },
  },
};
const result7 = Validator.validateDTO(data7, schema7);
console.log(result7); // Output: { address: { country: "Turkey", city: "Istanbul" } }

const schema8 = {
  address: {
    type: "sub-schema",
    subSchema: { country: { type: "string" }, city: { type: "string" } },
  },
};
const data8 = {
  address: {
    subSchema: { country: "Turkey", city: "Istanbul" },
  },
};
const result8 = Validator.validateDTO(data8, schema8);
console.log(result8); // Output: { address: { country: "Turkey", city: "Istanbul" } }

const schema9 = { name: { type: "string", required: true } };
const data9 = { name: "Alperen", extra: "property" };
try {
  Validator.validateDTO(data9, schema9);
} catch (error) {
  console.log(error.message); // Output: Extra property 'extra' found in data
}

const schema10 = { name: { type: "invalid", required: true } };
const data10 = { name: "Alperen" };
try {
  Validator.validateDTO(data10, schema10);
} catch (error) {
  console.log(error.message); // Output: Invalid schema type for property 'name'
}
