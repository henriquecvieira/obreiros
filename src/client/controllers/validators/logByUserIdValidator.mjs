import Ajv from "ajv";
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs";
import addFormats from "ajv-formats";

let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    userId: { type: "string", format: "uuid" },
  },
  required: ["userId"],
  additionalProperties: false,
};


async function validate(data) {
  const validateLog = ajv.compile(schema);
  const valid = validateLog(data);

  if (valid) {
    return valid;
  }
  throw new InvalidParameterException(JSON.stringify(validateLog.errors));
}

export default {
  validate,
};
