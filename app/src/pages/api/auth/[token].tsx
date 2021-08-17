import { NextApiRequest, NextApiResponse  } from 'next'
import { setCookie } from 'nookies'
import { signInRequest } from '../../../services/Auth';

interface signInRequestInterface extends NextApiRequest {
	query: {
		token?: string
	}
}

export default async function signInRedirect(req: signInRequestInterface, res: NextApiResponse) {
	const { query } = req
	const token = query.token
	const { status, user } = await signInRequest({ token })
	if (status === 200) {
		setCookie({ res }, 'corollas.token', token, {
			maxAge: 60 * 60 * 1, // 1 hour
			path: '/dashboard'
		})
		return res.redirect('/dashboard')
	} else {
		return res.status(400).json({ statusCode: 400, msg: 'Acesso negado' })
	}
}