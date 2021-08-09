import { NextApiRequest, NextApiResponse } from 'next'

import { generate } from '../../utils/Token';
import { transporter } from '../../utils/Mailer';
import { EmailTemplate } from '../../components/EmailTemplate';

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

	const mailOptions = {
		from: 'MagicLinkTutorial App',
		html: EmailTemplate( { username: 'Lucas Soares', link: `${process.env.HOST}/token=${token}`}),
		subject: 'Invitation',
		to: query.email
	}

	return transporter.sendMail(mailOptions, error => {
		if (error) {
			console.log(error)
			return res.status(510).json({ statusCode: 510, message: 'cannot send email' })
		}
		return res.status(200).json({ message: 'email has been sent' })
	})
}

export default EnviarEmail