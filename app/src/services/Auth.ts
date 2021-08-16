import jwt from 'jsonwebtoken'

type SignInRequestData = {
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

  //verificar se o email está cadastrado e retornar informações do usuário (nome, área, etc)

  return {
    status: 200,
    user: {
      name: 'Fulano',
      email: email,
      areaID: 1
    }
  }
}