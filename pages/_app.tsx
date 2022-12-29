import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'
import Layout from '../components/ui/Layout'
import { store } from '../redux/store'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<Head>
				<link rel='shortcut icon' href='/images/Z.png' type='image/x-icon' />
			</Head>
			<UserProvider>
				<Provider store={store}>
					<Layout>
						<Hydrate state={pageProps.dehydratedState}>
							<Component {...pageProps} />
						</Hydrate>
					</Layout>
				</Provider>
			</UserProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
