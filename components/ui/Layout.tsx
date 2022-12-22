import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState, setTheme, setUser } from '../../redux/store'
import Navbar from '../navbar/Navbar'
import Footer from './Footer'

function Layout(props: { children: React.ReactNode }) {
	const theme = useSelector((store: RootState) => store.theme)
	const dispatch = useDispatch()
	const { user, isAuthenticated, isLoading } = useAuth0()

	useEffect(() => {
		const themeFromLS = JSON.parse(localStorage.getItem('theme'))
		dispatch(setTheme(themeFromLS))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme])

	useEffect(() => {
		if (user) {
			const userFromLs = JSON.parse(localStorage.getItem('user'))
			dispatch(setUser(userFromLs))
		} else {
			dispatch(setUser({}))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return (
		<Wrapper className={`${theme}-theme`}>
			<Navbar />
			<ChildrenWrapper>{props.children}</ChildrenWrapper>
			<Footer />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	transition: 0.1s ease all;
`

const ChildrenWrapper = styled.main`
	min-height: calc(100vh - 200px);
`

export default Layout
