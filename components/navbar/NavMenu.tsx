import { useUser } from '@auth0/nextjs-auth0/client'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getNavMenuYears } from '../../utils'
import NavItem from './NavItem'

function NavMenu(props: { chevronDirection?: string }) {
	const { data: years, isLoading } = useQuery('navMenu', getNavMenuYears)

	const { user } = useUser()

	if (isLoading) {
		return (
			<NavList className='nav-menu'>
				<NavItem title='All Posts' path='/posts' />
				<NavItem chevronDirection={props.chevronDirection} title='Explore' dropdown={[]} />
			</NavList>
		)
	}

	return (
		<NavList className='nav-menu'>
			<NavItem title='Home' path='/' className='hidden' />
			<NavItem title='All Posts' path='/posts' />
			<NavItem chevronDirection={props.chevronDirection} title='Explore' dropdown={years} />
			{!!user && (
				<>
					<NavItem title='Profile' path='/dashboard' className='hidden' />
					<NavItem title='Create Post' path='/create-post' className='hidden' />
				</>
			)}
		</NavList>
	)
}

const NavList = styled.ul`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 0.5rem;

	@media (min-width: 768px) {
		.hidden {
			display: none;
		}
	}
`

export default NavMenu
