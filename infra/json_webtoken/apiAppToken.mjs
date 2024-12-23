import jwt from 'jsonwebtoken';

const validateApiAppToken = (req, res, next) => {
  try {
    const adminToken = req.headers.authorization
    if (adminToken === process.env.JWT_ADMIN_SECRET) {
      return next()
    }
    return res.status(401).json({ message: "não autorizado" })
  } catch (err) {
    return res.status(401).json({ message: "não autorizado" })
  }
}

export default validateApiAppToken;
