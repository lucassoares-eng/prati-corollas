import jwt from 'jsonwebtoken'

export const generate = (email: string) => {
    const date = new Date()
    date.setHours(date.getHours() + 1)
    return jwt.sign({ email, expiration: date }, process.env.JWT_SECRET!)
}