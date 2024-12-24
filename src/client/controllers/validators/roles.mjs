import Ajv from "ajv";
import InvalidParameterException from "../../../core/exceptions/InvalidParameterException.mjs";
import addFormats from "ajv-formats";

let ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 }, // Nome do obreiro
    function: { type: "string", minLength: 1 }, // Função exercida
    horario: { type: "string", minLength: 1 }, // Horário (pode ser refinado para formato específico, se necessário)
    role: { type: "string", minLength: 1 }, // Papel ou cargo
  },
  required: ["name", "function", "horario", "role"],
  additionalProperties: false, // Impede propriedades extras não especificadas no schema
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
