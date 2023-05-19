import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import ApplicationContextWrapper from '@/context/ApplicationContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const configs = {
  defaultOptions: {
    queries: {
      staleTime: 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false
    },
  },
}
export default function App({ Component, pageProps: { dehydratedState, session, ...pageProps }}: AppProps) {
  const queryClient = new QueryClient(configs);

  return (
    <SessionProvider session={session}>
      <ApplicationContextWrapper>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApplicationContextWrapper>
    </SessionProvider>
  )
}
