import { useUser } from '@auth0/nextjs-auth0/client'
import { useTranslation } from 'next-i18next'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getNavMenuYears } from '../../utils'
import NavItem from './NavItem'

function NavMenu(props: { chevronDirection?: string }) {
	const { data: years, isLoading } = useQuery('navMenu', getNavMenuYears)

	const { t: translate } = useTranslation('nav')
	const { user } = useUser()

	if (isLoading) {
		return (
			<NavList className='nav-menu'>
				<NavItem title={translate('all-posts')} path='/posts' />
				<NavItem chevronDirection={props.chevronDirection} title='Explore' dropdown={[]} />
			</NavList>
		)
	}

	return (
		<NavList className='nav-menu'>
			<NavItem title={translate('home')} path='/' className='hidden' />
			<NavItem title={translate('all-posts')} path='/posts' />
			<NavItem
				chevronDirection={props.chevronDirection}
				title={translate('explore')}
				dropdown={years}
			/>
			{!!user && (
				<>
					<NavItem title={translate('profile')} path='/dashboard' className='hidden' />
					<NavItem title={translate('create-post')} path='/create-post' className='hidden' />
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
