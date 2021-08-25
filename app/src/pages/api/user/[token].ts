import { NextApiRequest, NextApiResponse  } from 'next'
import { signInRequest } from '../../../services/Auth'
import jwt from 'jsonwebtoken'

interface signInRequestInterface extends NextApiRequest {
	query: {
		token?: string
	}
}

export default async function signIn(req: signInRequestInterface, res: NextApiResponse) {
	const auth = req.headers.authorization
	if (!auth || !auth.startsWith('Bearer ')) {
		return res.status(403).json({ statusCode: 403, msg: 'Forbidden' })
	}

	const authToken = auth.substring(7, auth.length)
	let decoded: string | jwt.JwtPayload
	try{
		decoded = jwt.verify(authToken, process.env.JWT_SECRET)
	} catch {
		return res.status(400).json({ statusCode: 400, msg: 'Cannot verify jwt'})
	}

	const token = req.query.token
	const { status, msg, user } = await signInRequest({ token })
	if (status === 200) {
		return res.status(200).json(user)
	}
	return res.status(status).json({ statusCode: status, msg: msg })
}