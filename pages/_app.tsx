import { UserProvider } from '@auth0/nextjs-auth0/client'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/ui/Layout'
import { store } from '../redux/store'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</UserProvider>
	)
}
