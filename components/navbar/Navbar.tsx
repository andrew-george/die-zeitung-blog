import { TbBulb, TbBulbOff } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toggleTheme } from '../../redux/store'
import Logo from '../ui/Logo'
import AuthButtons from './AuthButtons'
import NavMenu from './NavMenu'

import type { RootState } from '../../redux/store'

function Navbar() {
	const theme = useSelector((store: RootState) => store.theme)
	const dispatch = useDispatch()

	function themeToggleHandler() {
		dispatch(toggleTheme())
	}

	return (
		<NavWrapper>
			<div className='nav-left'>
				<Logo theme={theme} />
				<NavMenu />
			</div>
			<div className='nav-right'>
				{theme === 'dark' ? (
					<TbBulb onClick={themeToggleHandler} />
				) : (
					<TbBulbOff onClick={themeToggleHandler} />
				)}
				<AuthButtons />
			</div>
		</NavWrapper>
	)
}

const NavWrapper = styled.nav`
	font-weight: 500;
	max-width: 90%;
	margin: 0 auto;
	display: flex;
	height: 100px;
	justify-content: space-between;
	align-items: center;

	.nav-left {
		display: flex;
	}

	.nav-right {
		display: flex;
		align-items: center;

		svg {
			font-size: 1.3rem;
			cursor: pointer;
			margin: 0 1rem;
			transition: 0.1s ease all;
			&:hover {
				transform: scale(1.1);
			}
		}
	}
`

export default Navbar
