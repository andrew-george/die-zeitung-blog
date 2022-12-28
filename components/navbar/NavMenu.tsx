import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getNavMenuYears } from '../../utils'
import NavItem from './NavItem'

function NavMenu(props: { chevronDirection?: string }) {
	const { data: years, isLoading } = useQuery('navMenu', getNavMenuYears)

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
