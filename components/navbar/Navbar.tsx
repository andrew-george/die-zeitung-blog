import styled from 'styled-components'
import Logo from '../ui/Logo'
import AuthButtons from './AuthButtons'
import NavMenu from './NavMenu'

function Navbar() {
	return (
		<NavWrapper>
			<div className='nav-left'>
				<Logo />
				<NavMenu />
			</div>
			<AuthButtons />
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
`

export default Navbar
