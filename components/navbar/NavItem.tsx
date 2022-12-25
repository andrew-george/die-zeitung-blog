import Link from 'next/link'
import { useState } from 'react'
import { GoChevronDown, GoChevronRight } from 'react-icons/go'
import styled from 'styled-components'

function NavItem(props: {
	title: string
	dropdown?: string[]
	path?: string
	chevronDirection?: string
}) {
	const [isMenuCollapsed, setIsMenuCollapsed] = useState(true)

	function submenuHandler() {
		setIsMenuCollapsed(prevState => !prevState)
	}

	return (
		<Wrapper className='nav-item'>
			{props.path && (
				<Link href={props.path}>
					<li className='main-list-item' onClick={submenuHandler}>
						{props.title}
						{props.dropdown && <GoChevronDown />}
					</li>
				</Link>
			)}

			{!props.path && (
				<li className='main-list-item' onClick={submenuHandler}>
					{props.title}
					{props.dropdown && props.chevronDirection === 'right' && <GoChevronRight />}
					{props.dropdown && props.chevronDirection !== 'right' && <GoChevronDown />}
				</li>
			)}

			{props.dropdown && (
				<ul className={`${isMenuCollapsed ? 'collapsed dropdown' : 'dropdown'}`}>
					{props.dropdown?.map((dropdownItem, index) => {
						return (
							<Link key={index} href={`/posts/${dropdownItem}`}>
								<li
									className='dropdown-item'
									onClick={() => {
										setIsMenuCollapsed(true)
									}}
								>
									{dropdownItem}
								</li>
							</Link>
						)
					})}
				</ul>
			)}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	.main-list-item {
		display: flex;
		align-items: center;
		position: relative;
		margin: 0 0.5rem;
	}

	.dropdown {
		text-align: center;
		padding: 0.5rem 1.5rem;
		width: fit-content;
		background-color: #000000;
		border-radius: 5px;
		position: absolute;
		top: 70px;
		transition: 0.2s ease all;
	}

	.dropdown-item {
		padding: 5px 0;
		transition: 0.3s ease all;
		font-size: 0.8em;
		font-weight: 600;
		color: #aaa;

		&:hover {
			color: #fff;
		}
	}

	.collapsed {
		display: none;
	}
`

export default NavItem
