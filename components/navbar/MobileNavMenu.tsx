import { useUser } from '@auth0/nextjs-auth0/client'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { RootState, toggleSideMenu, toggleTheme } from '../../redux/store'
import Button from '../ui/Button'
import AuthButtons from './AuthButtons'
import LocaleSwitch from './LocaleSwitch'
import MobileNavbar from './MobileNavbar'
import NavMenu from './NavMenu'

function MobileNavMenu() {
	const theme = useSelector((store: RootState) => store.theme)

	const { t: translate } = useTranslation('nav')
	const { user, isLoading } = useUser()

	const dispatch = useDispatch()

	return (
		<Wrapper>
			<MobileNavbar />
			<NavMenu chevronDirection='right' />
			{!!user && (
				<div className='auth'>
					<Button className='logout-btn' type='button' theme={theme} style='none'>
						<a href='/api/auth/logout'>{translate('logout')}</a>
					</Button>
				</div>
			)}
			<LocaleSwitch />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: none;
	flex-direction: column;
	align-items: flex-start;
	width: 100vw;
	height: 100vh;
	position: fixed;
	background-color: inherit;
	z-index: 10;
	transition: all ease 0.3s;

	@media (max-width: 768px) {
		display: flex;
	}

	.nav-menu {
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		margin-bottom: 3rem;

		.nav-item {
			font-size: 1.2rem;
			font-weight: 500;
			margin: 10px 0;
			position: relative;
		}

		.dropdown {
			display: flex;
			text-align: center;
			padding: 0;
			width: fit-content;
			background-color: inherit;
			border-radius: 5px;
			position: absolute;
			left: 100px;
			top: -2px;
			transition: 0.1s ease all;

			&.collapsed {
				transform: translateX(-200vw);
			}

			.dropdown-item {
				margin: 0 10px;
				font-size: 0.9rem;
				font-weight: 600;
			}
		}
	}

	.logout-btn {
		font-size: 1rem;
		font-weight: 700;
	}
`

export default MobileNavMenu
