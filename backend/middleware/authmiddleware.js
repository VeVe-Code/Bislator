const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

let authmiddleware = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Sequelize: use findByPk, not findById
    const admin = await Admin.findByPk(decoded.id); // use decoded.id (not _id)
    if (!admin) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    req.admin = admin; // attach admin to request
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authmiddleware;
