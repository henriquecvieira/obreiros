import Ajv from "ajv";
import addFormats from "ajv-formats";
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs";

let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    startDate: { type: "string", format: "date-time" },
    endDate: { type: "string", format: "date-time" },
  },
  required: ["startDate", "endDate"],
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
