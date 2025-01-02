import Ajv from "ajv";
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs";
import addFormats from "ajv-formats";

let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
    gender: { type: "string", enum: ["homem", "mulher"] },
    role: { type: "string", enum: ["Pastor", "Pastor Evangelista", "Presbítero", "Oficial Obreiro(a)", "Diácono", "Diaconisa", "Cooperador(a)",] },
    active: { type: "boolean" },
  },
  required: ["name", "role", "gender", "active"],
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
