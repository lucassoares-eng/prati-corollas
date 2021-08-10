import * as React from 'react'

const bodyStyle = {
  width: '100%',
  margin: 0,
  padding: 0,
  WebkitTextSizeAdjust: '100%',
  MsTextSizeAdjust: '100%',
  fontFamily: 'Arial'
}

type Props = { title: string }

const EmailLayout: React.FC<Props> = ({ title, children }) => (
  <html lang="fr">
  <head>
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>{title}</title>
  </head>
  <body style={bodyStyle}>
    <h3>{title}</h3>
    <div>
      {children}
      <br></br>
      <div style= {{fontSize:"14px", lineHeight:"16px"}}>
        Atenciosamente
        <br></br>
        <table>
          <tbody>
            <tr>
              <td>
                <img src='http://www.pratidonaduzzi.com.br/images/assinatura.jpg'></img>
              </td>
              <td style= {{paddingTop:"1px", fontFamily:"Arial", fontSize:"12px", lineHeight:"16px"}}>
                <strong>Lucas de Jesus Soares</strong>
                <br></br>
                Assessor
                <br></br>
                Presidência
                <br></br>
                +55 (45) 2103-1420
                <br></br>
                www.pratidonaduzzi.com.br 
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
  </html>
)

export default EmailLayout