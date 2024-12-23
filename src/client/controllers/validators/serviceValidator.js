import Ajv from "ajv"
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs"
import addFormats from "ajv-formats"

let ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const serviceSchema = {
  type: "object",
  properties: {
    description: { type: "string" },
    serviceDate: { type: "string", format: "date" },
    completionDeadline: { type: "string", format: "date" },
    status: { type: "string", enum: ["Pending", "In progress", "Completed"] },
  },
  required: ["description", "serviceDate", "completionDeadline", "status"],
  additionalProperties: false,
}

async function validate(data) {
  const validateClient = ajv.compile(serviceSchema)
  const valid = validateClient(data)

  if (valid) {
    return valid
  }
  throw new InvalidParameterException(JSON.stringify(validateClient.errors))
}

export default {
  validate,
}
