import { v4 as uuidv4 } from 'uuid';

const query = (userId, pagination = { limit: 10, page: 1 }) => {
  const { limit, page } = pagination;
  const skip = (page - 1) * limit;

  return {
    filter: {
      userId: uuidv4(userId),
    },
    options: {
      limit,
      skip,
    },
  };
};

export default {
  query,
};
