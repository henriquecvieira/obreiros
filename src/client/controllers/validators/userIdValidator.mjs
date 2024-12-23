import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs"
import Ajv from "ajv"
import addFormats from "ajv-formats"
import addErrors from "ajv-errors"

let ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)
addErrors(ajv)

const schema = {
  type: "string",
  properties: {
    userId: {
      type: "string",
      format: "uuid",
      errorMessage: "Formato de ID inválido. Deve ser um UUID válido.",
    },
    userResponse: {
      type: "object",
      properties: {
        _id: { type: "string", format: "uuid" },
        name: { type: "string" },
        password: { type: "string" },
        active: { type: "boolean" },
        contact: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            mobile: { type: "string" },
          },
          required: ["email", "phone", "mobile"],
        },
        address: {
          type: "object",
          properties: {
            street: { type: "string" },
            number: { type: "integer" },
            complement: { type: "string" },
            neighborhood: { type: "string" },
            city: { type: "string" },
            state: { type: "string", minLength: 2, maxLength: 2 },
            zipCode: { type: "string", pattern: "^\\d{5}-\\d{3}$" },
          },
          required: ["street", "number", "city", "state", "zipCode"],
        },
        documents: {
          type: "object",
          properties: {
            cpf: {
              type: "string",
              pattern: "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$",
            },
            cnpj: { type: "string" },
          },
          required: ["cpf"],
        },
        art: {
          type: "object",
          properties: {
            number: { type: "string" },
            issueDate: { type: "string", format: "date" },
            validity: { type: "string", format: "date" },
          },
          required: ["number", "issueDate", "validity"],
        },
        payments: {
          type: "array",
          items: {
            type: "object",
            properties: {
              method: { type: "string" },
              amount: { type: "integer" },
              dueDate: { type: "string", format: "date" },
              paymentDate: { type: ["string", "null"], format: "date" },
              status: { type: "string" },
            },
            required: ["method", "amount", "dueDate", "status"],
          },
        },
        services: {
          type: "array",
          items: {
            type: "object",
            properties: {
              description: { type: "string" },
              serviceDate: { type: "string", format: "date" },
              completionDeadline: { type: "string", format: "date" },
              status: { type: "string" },
            },
            required: [
              "description",
              "serviceDate",
              "completionDeadline",
              "status",
            ],
          },
        },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
        dates: {
          type: "object",
          properties: {
            registrationDate: { type: "string", format: "date-time" },
            lastUpdateDate: { type: "string", format: "date-time" },
          },
          required: ["registrationDate", "lastUpdateDate"],
        },
        notes: { type: "string" },
      },
      required: [
        "_id",
        "name",
        "contact",
        "address",
        "documents",
        "art",
        "payments",
        "services",
        "createdAt",
        "updatedAt",
      ],
      additionalProperties: false,
    },
  },
  required: ["userId", "userResponse"],
  additionalProperties: false,
  errorMessage: {
    required: {
      userId: "O campo 'userId' é obrigatório.",
    },
  },
}

async function validate(data) {
  const validate = ajv.compile(schema)
  const valid = validate(data)

  if (!valid) {
    throw new InvalidParameterException(JSON.stringify(validate.errors))
  }
}

export default {
  validate,
}
