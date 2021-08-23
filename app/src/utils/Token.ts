import jwt from 'jsonwebtoken'

export const generate = (email: string) => {
    return jwt.sign(
      {
        email: email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 5 // 5days
      }
    ) 
}