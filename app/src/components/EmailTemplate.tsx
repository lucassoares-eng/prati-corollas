import React from 'react'

type Props = {
  username: string, 
  link: string
}

export const EmailTemplate = ({ username, link }: Props) => `
	<p><b>Hi ${ username }!</b></p>
  <p>Click the link to login: ${ link }</p>
`