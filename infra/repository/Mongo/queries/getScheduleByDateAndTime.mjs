const query = (date, time) => {
  return {
    date: new Date(date),
    time: time,
  };
};

export default {
  query,

};
