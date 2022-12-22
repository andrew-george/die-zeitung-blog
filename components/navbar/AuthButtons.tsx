import { useAuth0 } from '@auth0/auth0-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Button from '../ui/Button'

import type { RootState } from '../../redux/store'

function AuthButtons() {
	const theme = useSelector((store: RootState) => store.theme)
	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

	return (
		<AuthButtonsWrapper>
			{!isAuthenticated && (
				<Button
					style='fill'
					theme={theme}
					onClick={() => {
						loginWithRedirect()
					}}
				>
					Login / Sign Up
				</Button>
			)}
			{isAuthenticated && user && (
				<>
					<Button
						theme={theme}
						style='none'
						onClick={() => logout({ returnTo: window.location.origin })}
					>
						Logout
					</Button>
					<Image src={user.picture} alt='profile picture' width={200} height={200} />
				</>
			)}
		</AuthButtonsWrapper>
	)
}

const AuthButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
		margin-left: 1rem;
	}
`

export default AuthButtons
