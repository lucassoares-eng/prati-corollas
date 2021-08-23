import jwt from 'jsonwebtoken'

export const generate = (email: string) => {
    return jwt.sign(
      {
        email: email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 120 // 2min
      }
    ) 
}