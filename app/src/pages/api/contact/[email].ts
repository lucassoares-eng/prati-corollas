import { NextApiRequest, NextApiResponse } from 'next'
import { Mailer } from 'nodemailer-react'
import { generate } from '../../../utils/Token'
import { transporter } from '../../../utils/Mailer'
import EmailToken from '../../../components/EmailToken'

interface LoginRequest extends NextApiRequest {
	query: {
		email?: string
	}
}

async function EnviarLink (req: LoginRequest, res: NextApiResponse) {
	if (req.method != 'POST') {
		return res.status(405).json({ statusCode: 405, msg: 'Method Not Allowed' })
	}

  const { query } = req;
	if (!query.email) {
		return res.status(400).json({ statusCode: 400, msg: 'Email is required' })
	}

  const user = await fetch(`${process.env.URL_API_CC}corollas-user?email=${query.email}`)
	if (user.status != 200) {
		return res.status(401).json({ statusCode: 401, msg: 'email validation failed' })
	}
	try {
		const data = await user.json()
		const {userID} = data[0]
	} catch {
		return res.status(402).json({ statusCode: 402, msg: 'user not found' })
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
		return res.status(200).json({ msg: 'Email has been sent' })
	} catch {
		return res.status(500).json({ statusCode: 500, msg: 'Cannot send email' })
	}
}

export default EnviarLink