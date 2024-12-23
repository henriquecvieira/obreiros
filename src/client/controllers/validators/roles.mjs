import Ajv from "ajv";
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs";
import addFormats from "ajv-formats";

let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    role: { type: "string",  }
     },
  required: ["role"],
  additionalProperties: false,
};

async function validate(data) {
  const validateObreiro = ajv.compile(schema);
  const valid = validateObreiro(data);

  if (valid) {
    return valid;
  }
  throw new InvalidParameterException(JSON.stringify(validateObreiro.errors));
}

export default {
  validate,
};
