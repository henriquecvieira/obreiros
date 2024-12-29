import Ajv from "ajv";
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs";
import addFormats from "ajv-formats";

let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    role: { type: "string", minLength: 1 }, 
  },
  required: ["role"],
  additionalProperties: false, 
};

async function validate(data) {
  const validateSchedule = ajv.compile(schema);
  const valid = validateSchedule(data);

  if (valid) {
    return valid;
  }
  throw new InvalidParameterException(JSON.stringify(validateSchedule.errors));
}

export default {
  validate,
};
