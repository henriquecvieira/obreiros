import Ajv from "ajv"
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs"
import addFormats from "ajv-formats"
import addErrors from "ajv-errors"

let ajv = new Ajv({ allErrors: true })
addFormats(ajv)
addErrors(ajv)

const schema = {
  type: "object",
  properties: {
    userId: { type: "string", minLength: 1 },
    resetToken: { type: "string", minLength: 1 },
    newPassword: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["userId", "resetToken", "newPassword"],
  additionalProperties: false,
}

async function validate(data) {
  const validateResetPassword = ajv.compile(schema)
  const valid = validateResetPassword(data)

  if (valid) {
    return valid
  }
  throw new InvalidParameterException(
    JSON.stringify(validateResetPassword.errors)
  )
}

export default {
  validate,
}
