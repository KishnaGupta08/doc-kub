const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded; // decoded contains the payload you signed (e.g., user id)
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};