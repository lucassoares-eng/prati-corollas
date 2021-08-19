import jwt from 'jsonwebtoken'

export type SignInRequestData = {
	token: string
}

export async function signInRequest({ token }: SignInRequestData) {

  let decoded: string | jwt.JwtPayload 
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return {
      status: 400,
      msg: 'cannot verify jwt'
    }
  }

  if (!decoded.hasOwnProperty('email') || !decoded.hasOwnProperty('expiration')){
    return {
      status: 401,
      msg: 'invalid jwt token'
    }
  }

  const { email, expiration } = (decoded as { email: string, expiration: Date})
  if (expiration < new Date()) {
    return {
      status: 402,
      msg: 'token has expired'
    }
  }

  //verificar se o email está cadastrado e retornar userID e areaID

  return {
    status: 200,
    user: {
      userID: 1,
      areaID: 1
    }
  }
}