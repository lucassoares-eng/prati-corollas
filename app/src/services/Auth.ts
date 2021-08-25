import jwt from 'jsonwebtoken'

export type SignInRequestData = {
	token: string
}

export async function signInRequest({ token }: SignInRequestData) {

  let decoded: string | jwt.JwtPayload
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    if('TokenExpiredError') {
      return {
        status: 402,
        msg: 'token has expired'
      }
    }
    return {
      status: 400,
      msg: 'cannot verify jwt',
    }
  }

  if (!decoded.hasOwnProperty('email') || !decoded.hasOwnProperty('areaID')){
    return {
      status: 401,
      msg: 'invalid jwt token'
    }
  }

  const { email } = (decoded as { email: string })
  try {
    const res = await fetch(`${process.env.URL_API_CC}corollas-user?email=${email}`)
    if (res.status === 200) {
      const data = await res.json()
      const {userID, user, areaID} = data[0]
      return {
        status: 200,
        user: {
          userID: userID,
          user: user,
          email: email,
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

export async function recoverUserInformation({ token }: SignInRequestData) {
  const res = await fetch(`/api/user/${token}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  const data = await res.json()
  return {
    user: data
  }
}