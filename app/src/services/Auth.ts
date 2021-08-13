import jwt from 'jsonwebtoken'

type Props = {
	token: string
  decoded: string | jwt.JwtPayload
  isValidated: boolean
  msg: string
}

export const isValidated = ({ token, decoded, isValidated = false, msg }: Props) => {

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    msg = 'cannot verify jwt'
    return [isValidated, msg]
  }

  if (!decoded.hasOwnProperty('email') || !decoded.hasOwnProperty('expiration')){
    msg = 'invalid jwt token'
    return [isValidated, msg]
  }

  const { email, expiration } = (decoded as { email: string, expiration: Date})
  if (expiration < new Date()) {
    msg = 'token has expired'
    return [isValidated, msg]
  }

  msg = 'user validated'
  return [isValidated = true, msg]
}