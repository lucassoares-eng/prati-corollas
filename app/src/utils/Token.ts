import jwt from 'jsonwebtoken'

export const generate = (email: string, areaID: number) => {
    return jwt.sign(
      {
        email: email,
        areaID: areaID
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24 * 5 // 5days
      }
    ) 
}