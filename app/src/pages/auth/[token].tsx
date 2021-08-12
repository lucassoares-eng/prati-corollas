import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

interface AuthRequest extends NextApiRequest {
	query: {
		token?: string
	}
}

const isAuthorized = (req: AuthRequest, res: NextApiResponse) => {
  const { query } = req
  const token = query.token

  let decoded: string | jwt.JwtPayload
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return res.status(400).json({ statusCode: 400, message: 'cannot verify jwt' })
  }

  if (!decoded.hasOwnProperty('email') || !decoded.hasOwnProperty('expiration')){
    return res.status(400).json({ statusCode: 400, message: 'invalid jwt token' })
  }

  const { email, expiration } = (decoded as { email: string, expiration: Date})
  if (expiration < new Date()) {
    return res.status(400).json({ statusCode: 400, message: 'token has expired' })
  }

  return res.status(200).json({ statusCode: 200, message: decoded })
}

export default isAuthorized