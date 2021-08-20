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

  try {
    const res = await fetch(`${process.env.URL_API_CC}corollas-user?email=${email}`)
    if (res.status === 200) {
      const data = await res.json()
      const {userID, areaID} = data[0]
      return {
        status: 200,
        user: {
          userID: userID,
          areaID: areaID
        }
      }
    } else {
      return {
        status: 403,
        msg: 'user validation failed'
      }
    }
  } catch (error) {
    return {
      status: 403,
      msg: 'user validation failed'
    }
  }
}