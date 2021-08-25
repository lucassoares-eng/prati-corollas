import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>PerdasCorollas</title>
      </Head>
      <Component {...pageProps}></Component>
    </AuthProvider>
  )
}

export default MyApp