import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState, setTheme, setUser } from '../../redux/store'
import MobileNavbar from '../navbar/MobileNavbar'
import MobileNavMenu from '../navbar/MobileNavMenu'
import Navbar from '../navbar/Navbar'
import Footer from './Footer'

function Layout(props: { children: React.ReactNode }) {
	const theme = useSelector((store: RootState) => store.theme)
	const dispatch = useDispatch()
	const { user } = useUser()

	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(theme))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		// const themeFromLS = JSON.parse(localStorage.getItem('theme'))
		const themeFromLS = JSON.parse(localStorage.getItem('theme'))
		dispatch(setTheme(themeFromLS))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme])

	useEffect(() => {
		if (!!user == true) {
			const userFromLs = JSON.parse(localStorage.getItem('user'))
			dispatch(setUser(userFromLs))
		} else {
			dispatch(setUser(null))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return (
		<Wrapper className={`${theme}-theme`}>
			<MobileNavMenu />
			<Navbar />
			<MobileNavbar />
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
