import ApplicationContextWrapper from '@/context/ApplicationContext';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';

const configs = {
  defaultOptions: {
    queries: {
      staleTime: 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retryDelay: 1000,
    },
  },
};
export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  const queryClient = new QueryClient(configs);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>

      <Script
        async={true}
        defer={true}
        src="https://apis.google.com/js/api.js"
        strategy="lazyOnload"
      />

      <Script
        async={true}
        defer={true}
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
      />
      <SessionProvider session={session}>
        <ApplicationContextWrapper>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ApplicationContextWrapper>
      </SessionProvider>
    </>
  );
}
