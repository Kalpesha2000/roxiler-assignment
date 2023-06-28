const calculateTotalPages = (totalItems, perPage) => {
  return Math.ceil(totalItems / perPage);
};

module.exports = {
  calculateTotalPages,
};
