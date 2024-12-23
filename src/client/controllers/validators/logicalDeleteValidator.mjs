import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs"
import Ajv from "ajv"
import addFormats from "ajv-formats"

let ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const schemaLogin = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    _id: { type: "string" },
  },
  anyOf: [{ required: ["email"] }, { required: ["_id"] }],
  additionalProperties: false,
}

async function validate(data) {
  const validateLogin = ajv.compile(schemaLogin)
  const resultLogin = validateLogin(data)

  if (resultLogin) {
    return resultLogin
  }
  throw new InvalidParameterException(JSON.stringify(validateLogin.errors))
}

export default {
  validate,
}
