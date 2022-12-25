import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import AuthButtons from './AuthButtons'
import NavMenu from './NavMenu'

function MobileNavMenu(props: { className?: string; menuToggleHandler: () => void }) {
	return (
		<Wrapper className={props.className}>
			<div className='header'>
				<FaBars className='hamburger-toggler' onClick={props.menuToggleHandler} />
				<AuthButtons />
			</div>
			<NavMenu chevronDirection='right' />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100vw;
	height: 50vh;
	position: fixed;
	background-color: inherit;
	z-index: 10;
	transition: all ease 0.3s;
	padding: 1rem;
	transform: translateY(-200vw);

	.header {
		width: 90%;
		margin: 1rem auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;

		.auth {
			display: flex;
		}

		.hamburger-toggler {
			font-size: 1.1rem;
		}
	}

	&.menu-reveal {
		transform: translateY(0);
	}

	.nav-menu {
		flex-direction: column;
		align-items: flex-start;
		width: 100%;

		.nav-item {
			font-size: 1.2rem;
			font-weight: 500;
			margin: 10px 0;
			position: relative;
		}

		.dropdown {
			text-align: center;
			padding: 0;
			width: fit-content;
			background-color: inherit;
			border-radius: 5px;
			position: absolute;
			left: 30px;
			top: 35px;
			transition: 0.2s ease all;

			&.collapsed {
				display: block;
				transform: translateX(-100px);
			}

			.dropdown-item {
				padding: 5px 0;
				font-size: 0.9em;
				font-weight: 600;
				color: #000000;
			}
		}
	}
`

export default MobileNavMenu
