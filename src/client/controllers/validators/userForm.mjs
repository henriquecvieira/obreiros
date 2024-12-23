import Ajv from "ajv"
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs"
import addFormats from "ajv-formats"
let ajv = new Ajv({ allErrors: true })
addFormats(ajv)

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    documents: {
      type: "object",
      properties: {
        cpf: { type: "string" },
        cnpj: { type: "string" },
      },
      anyOf: [{ required: ["cpf", "cnpj"] }],
      additionalProperties: false,
    },
    contact: {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
        phone: { type: "string" },
        mobile: { type: "string" },
      },
      required: ["phone", "mobile"],
      additionalProperties: false,
    },
    address: {
      type: "object",
      properties: {
        street: { type: "string" },
        number: { type: "integer" },
        complement: { type: "string" },
        neighborhood: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        zipCode: { type: "string" },
      },
      required: ["street", "number", "city", "state", "zipCode"],
      additionalProperties: false,
    },
    dates: {
      type: "object",
      properties: {
        registrationDate: { type: "string", format: "date-time" },
        lastUpdateDate: { type: ["string", "null"], format: "date-time" },
      },
      required: ["registrationDate"],
      additionalProperties: false,
    },
    art: {
      type: "object",
      properties: {
        number: { type: "string" },
        issueDate: { type: "string", format: "date" },
        validity: { type: "string", format: "date" },
      },
      required: ["number", "issueDate"],
      additionalProperties: false,
    },
    services: {
      type: "array",
      items: {
        type: "object",
        properties: {
          description: { type: "string" },
          serviceDate: { type: "string", format: "date" },
          completionDeadline: { type: "string", format: "date" },
          status: {
            type: "string",
            enum: ["Pending", "In progress", "Completed"],
          },
        },
        required: [
          "description",
          "serviceDate",
          "completionDeadline",
          "status",
        ],
        additionalProperties: false,
      },
    },
    payments: {
      type: "array",
      items: {
        type: "object",
        properties: {
          method: { type: "string", enum: ["Boleto", "Card", "Transfer"] },
          amount: { type: "number" },
          dueDate: { type: "string", format: "date" },
          paymentDate: { type: ["string", "null"], format: "date" },
          status: { type: "string", enum: ["Pending", "Paid", "Overdue"] },
        },
        required: ["status"],
        additionalProperties: false,
      },
    },
    notes: { type: "string" },
    active: { type: "boolean" },
  },
  required: [
    "name",
    "documents",
    "contact",
    "address",
    "dates",
    "services",
    "payments",
    "notes",
  ],
  additionalProperties: false,
}

async function validate(data) {
  const validateClient = ajv.compile(schema)
  const valid = validateClient(data)

  if (valid) {
    return valid
  }
  throw new InvalidParameterException(JSON.stringify(validateClient.errors))
}

export default {
  validate,
}
