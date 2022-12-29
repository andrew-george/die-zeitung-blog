import { FaBars } from 'react-icons/fa'
import { TbBulb, TbBulbOff } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toggleSideMenu, toggleTheme } from '../../redux/store'
import Logo from '../ui/Logo'

import type { RootState } from '../../redux/store'
import AuthButtons from './AuthButtons'

function MobileNavbar() {
	const isSideMenuOpen = useSelector((store: RootState) => store.sideMenu)

	const theme = useSelector((store: RootState) => store.theme)
	const dispatch = useDispatch()

	function themeToggleHandler() {
		dispatch(toggleTheme())
	}

	return (
		<NavWrapper>
			<div className='nav-left'>
				<FaBars className='hamburger-toggler' onClick={() => dispatch(toggleSideMenu())} />
				{theme === 'dark' ? (
					<TbBulb className='theme-toggler' onClick={themeToggleHandler} />
				) : (
					<TbBulbOff className='theme-toggler' onClick={themeToggleHandler} />
				)}
			</div>
			<Logo theme={theme} />
			<div className='nav-right'>
				<AuthButtons />
			</div>
		</NavWrapper>
	)
}

const NavWrapper = styled.nav`
	font-weight: 500;
	width: 90%;
	margin: 0 auto;
	height: 100px;
	display: none;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 768px) {
		display: flex;

		.logout-btn {
			display: none;
		}

		.nav-left {
			width: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.theme-toggler {
				font-size: 1.3rem;
			}

			.hamburger-toggler {
				font-size: 1.1rem;
			}
		}

		img {
			margin: 0;
		}
	}

	.nav-right {
		display: flex;
		align-items: center;

		svg {
			font-size: 1.3rem;
		}
	}
`

export default MobileNavbar
