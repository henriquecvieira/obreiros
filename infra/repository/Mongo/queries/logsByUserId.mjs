import UUIDGenerator from "../../../../src/support/UUIDGenerator.mjs";


const query = (params) => ({
  userId: UUIDGenerator.from(params.userId)
});

export default {
  query,
};
