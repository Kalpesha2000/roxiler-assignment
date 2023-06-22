// Middleware for pagination
const paginationMiddleware = (req, res, next) => {
  const { page = 1, perPage = 10 } = req.query;
  req.pagination = {
    skip: (page - 1) * perPage,
    limit: perPage,
  };
  next();
};

module.exports = paginationMiddleware;
