import Ajv from "ajv";
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs";
import addFormats from "ajv-formats";

let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
    function: { type: "string", enum: ["Pastor", "Pastor Evangelista", "Presbítero", "Oficial Obreiro","Diácono", "Diaconisa", "Cooperador(a)", ] },
    gender: { type: "string", enum: ["homem", "mulher"] },
    active: { type: "boolean" },
  },
  required: ["name", "function", "gender", "active"],
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
