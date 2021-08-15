import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp