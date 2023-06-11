const jwt = require("jsonwebtoken");
const {getFormattedResponse} = require("../utils/helpers");

module.exports = (req, res, next, config) => {
  const excludeRoutes = config.auth.excludes;

  if (excludeRoutes.includes(req.url)) {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json(getFormattedResponse(false, 'Empty authorization header', {}));
  }
  const [bearer, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json(getFormattedResponse(false, 'Empty token', {}));
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_AUTH_KEY);
  } catch (err) {
    console.error(err);
    return res.status(401).json(getFormattedResponse(false, err.message, {}));
  }

  return next();
}