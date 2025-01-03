const query = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  end.setHours(23, 59, 59, 999);

  return {
    date: {
      $gte: start,
      $lte: end
    }
  };
};

export default {
  query,
};
