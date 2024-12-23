const query = (data) => {
  return {
    action: "User Login",  // Ação definida como "User Login"
    timestamp: {
      $gte: new Date(data.startDate),  // A data de início passada como parâmetro
      $lte: new Date(data.endDate),    // A data de fim passada como parâmetro
    },
  };
};

export default {
  query,
};
