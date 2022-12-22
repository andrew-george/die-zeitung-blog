import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import type { RootState } from '../../redux/store'
import { setTheme } from '../../redux/store'
import Navbar from '../navbar/Navbar'
import Footer from './Footer'

function Layout(props: { children: React.ReactNode }) {
	const theme = useSelector((store: RootState) => store.theme)
	const dispatch = useDispatch()

	useEffect(() => {
		const themeFromLS = JSON.parse(localStorage.getItem('theme'))
		dispatch(setTheme(themeFromLS))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme])

	return (
		<Wrapper className={`${theme}-theme`}>
			<Navbar />
			<ChildrenWrapper>{props.children}</ChildrenWrapper>
			<Footer />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	transition: 0.2s ease all;
`

const ChildrenWrapper = styled.main`
	min-height: calc(100vh - 200px);
`

export default Layout
