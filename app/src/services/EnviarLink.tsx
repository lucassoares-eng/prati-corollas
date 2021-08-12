import { NextApiRequest, NextApiResponse } from 'next'
import { Mailer } from 'nodemailer-react'

import { generate } from '../utils/Token'
import { transporter } from '../utils/Mailer'

import EmailToken from '../components/EmailToken'

interface LoginRequest extends NextApiRequest {
	query: {
		email?: string
	}
}

const EnviarLink = (req: LoginRequest, res: NextApiResponse) => {
  const { query } = req;

	if (!query) {
		return res.status(400).json({ statusCode: 400, message: 'email is required' })
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
				link: `${process.env.HOST}/api/auth/${token}`,
				subject: "Seu link para o Relatório de Corollas"
			},
			{
				to: query.email,
				attachments: [],
			}
		)
		return res.status(200).json({ message: 'email has been sent' })
	} catch {
		return res.status(400).json({ statusCode: 400, message: 'cannot send email' })
	}
}

export default EnviarLink