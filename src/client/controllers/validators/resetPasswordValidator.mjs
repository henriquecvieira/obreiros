import Ajv from "ajv"
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs"
import addFormats from "ajv-formats"
import addErrors from "ajv-errors"

let ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)
addErrors(ajv)

const schema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    newPassword: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["email"],
  additionalProperties: false,
}

async function validate(data) {
  const validateUser = ajv.compile(schema)
  const valid = validateUser(data)

  if (valid) {
    return valid
  }
  throw new InvalidParameterException(JSON.stringify(validateUser.errors))
}
export default {
  validate,
}
