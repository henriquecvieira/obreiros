import jwt from "jsonwebtoken"

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const decode = jwt.verify(token, process.env.KEY_TOKEN_JWT)
    req.userId = decode._id
    req.userName = decode.name
    next()
  } catch (err) {
    return res.status(401).json({ message: "não autorizado" })
  }
}
export default validateToken
