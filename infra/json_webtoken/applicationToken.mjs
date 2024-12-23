import jwt from "jsonwebtoken"

const validateToken = (req, res, next) => {
  try {
    const applicationToken = req.headers.authorization
    if (applicationToken === process.env.APPLICATION_TOKEN) {
      return next()
    }
    return res.status(401).json({ message: "não autorizado" })
  } catch (err) {
    return res.status(401).json({ message: "não autorizado" })
  }
}

export default validateToken
