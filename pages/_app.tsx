import { Auth0Provider } from '@auth0/auth0-react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/ui/Layout'
import { store } from '../redux/store'
import '../styles/globals.css'

const domain = 'dev-habu5ynjwiwbz4jd.us.auth0.com'
const clientId = 'R8j96dbVaFUL8E3pdqZxshpdcO3CkXTQ'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Auth0Provider domain={domain} clientId={clientId} redirectUri='http://localhost:3000'>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</Auth0Provider>
	)
}
