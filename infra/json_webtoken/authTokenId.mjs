import jwt from "jsonwebtoken"

const validateTokenId = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const decode = jwt.verify(token, process.env.KEY_TOKEN_JWT)
    req._id = decode._id
    req.userType = decode.userType
    req.email = decode.email || null
    if (req.userType === "admin") {
      return next()
    }
    const userId = req.params.id
    if (req._id !== userId) {
      return res.status(403).json({ message: "Acesso negado" })
    }
    next()
  } catch (err) {
    return res.status(401).json({ message: "não autorizado" })
  }
}

export default validateTokenId
