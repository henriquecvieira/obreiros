import bcrypt from "bcryptjs"

export const generatePassword = async (password) => {
  const hashPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 5, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    })
  })

  return hashPassword
}
