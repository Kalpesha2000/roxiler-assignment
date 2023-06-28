const paginationMiddleware = (req, res, next) => {
  const { page = 1, perPage = 10 } = req.query;

  req.query.page = parseInt(page, 10);
  req.query.perPage = parseInt(perPage, 10);

  next();
};

module.exports = paginationMiddleware;
