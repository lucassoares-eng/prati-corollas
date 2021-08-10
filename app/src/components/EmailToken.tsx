import React from 'react';
import EmailLayout from './EmailLayout';
import { Email } from '../utils/Mailer';

type Props = {
  firstName: string,
  lastName: string,
  link: string,
  subject: string,
}

const buttonStyle = {
  backgroundColor: '#4299e1',
  width: "80px",
  height: "35px",
  display: "flex",
  justifyContent: "center",
  alignItens: "center",
  paddingTop: "6px",
  paddingLeft: "12px",
  marginLeft: "30px",
}

const linkStyle = {
  color: '#ffffff',
  fontSize: "13pt",
  padding: "5px",
}

const EmailToken: Email<Props> = ({ firstName, lastName, link, subject }) => ({
  subject: subject,
  body: (
    <EmailLayout title={`Olá ${firstName} ${lastName}!`}>
      <div>
        <h3>Clique no botão abaixo para acessar o Relatório de Corollas:</h3>
        <div style={buttonStyle}>
          <a href={link} style={linkStyle}>Acessar</a>
        </div>
        <p style={{marginTop: "40px", marginBottom: "14px", color: '#6b6b6b'}}>Alternativamente você também pode copiar e colar o link abaixo no seu navegador:</p>
        <p style={{marginBottom: "14px", fontSize: '10pt'}}>{ link }</p>
      </div>
    </EmailLayout>
  ),
})

export default EmailToken