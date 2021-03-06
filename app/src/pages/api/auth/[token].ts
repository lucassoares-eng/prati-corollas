import { NextApiRequest, NextApiResponse  } from 'next'
import { setCookie } from 'nookies'
import { signInRequest } from '../../../services/Auth';

interface signInRequestInterface extends NextApiRequest {
	query: {
		token?: string
	}
}

export default async function signIn(req: signInRequestInterface, res: NextApiResponse) {
	const { query } = req
	const token = query.token
	const { status, msg, user } = await signInRequest({ token })
	if (status === 200) {
		setCookie({ res }, 'corollas.token', token, {
			maxAge: 60 * 60 * 1, // 1 hour
			path: '/'
		})
		return res.redirect(`/dashboard/${user.areaID}/2021`)
	} else if (status === 402) {
		return res.redirect(`/?expired=true`)
	}
	return res.redirect(`/?error=true`)
}