import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllPosts } from '../../utils'
import NavItem from './NavItem'

function NavMenu(props: { chevronDirection?: string }) {
	const [years, setYears] = useState([''])

	useEffect(() => {
		async function getPosts() {
			const posts = await getAllPosts()

			let yearsArr = []

			for (const key in posts) {
				yearsArr.push(posts[key].year)
			}
			const yearsSet = Array.from(new Set(yearsArr))
			setYears(yearsSet)
		}

		getPosts()
	}, [])

	return (
		<NavList className='nav-menu'>
			<NavItem title='All Posts' path='/posts' />
			<NavItem chevronDirection={props.chevronDirection} title='Explore' dropdown={years} />
		</NavList>
	)
}

const NavList = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 0.5rem;
`

export default NavMenu
