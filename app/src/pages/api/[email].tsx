import { NextApiRequest, NextApiResponse } from 'next'
import { Mailer } from 'nodemailer-react'
import { generate } from '../../utils/Token'
import { transporter } from '../../utils/Mailer'

import EmailToken from '../../components/EmailToken'

interface LoginRequest extends NextApiRequest {
	query: {
		email?: string
	}
}

const EnviarEmail = (req: LoginRequest, res: NextApiResponse) => {
  const { query } = req;

	if (!query) {
		return res.status(505).json({ statusCode: 505, message: 'email is required' })
	}
	const token = generate(query.email)

	const emailsList = {
		pass: EmailToken,
	}

	const mailer = Mailer(transporter, emailsList)

	try { 
		mailer.send(
			'pass', {
				firstName: 'Usuário',
				lastName: 'Sobrenome',
				brand: 'Linkvalue',
				newAccount: true,
				password: token,
			}, 
			{
				to: query.email,
				attachments: [],
			}
		)
		return res.status(200).json({ message: 'email has been sent' })
	} catch {
		return res.status(510).json({ statusCode: 510, message: 'cannot send email' })
	}
}

export default EnviarEmail