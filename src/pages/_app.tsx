/* eslint-disable react/prop-types */
import { type AppType } from 'next/app'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { api } from '@/utils/api'

import '@/styles/globals.css'
import Layout from '@/components/Layout'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
