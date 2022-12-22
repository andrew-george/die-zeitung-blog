import { useAuth0 } from '@auth0/auth0-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'
import Button from '../ui/Button'

import { RootState, setUser } from '../../redux/store'

function AuthButtons() {
	const theme = useSelector((store: RootState) => store.theme)
	// const userState = useSelector((store: RootState) => store.user)
	const dispatch = useDispatch()

	const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0()

	useEffect(() => {
		dispatch(setUser(user))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	if (isLoading) {
		if (theme === 'dark') {
			return (
				<AuthButtonsWrapper>
					<ClipLoader className='clip-loader' size={25} color='#fff' />
				</AuthButtonsWrapper>
			)
		} else {
			return (
				<AuthButtonsWrapper>
					<ClipLoader className='clip-loader' size={25} />
				</AuthButtonsWrapper>
			)
		}
	}

	return (
		<AuthButtonsWrapper>
			{!isAuthenticated && !isLoading && (
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
			{isAuthenticated && !isLoading && user && (
				<>
					<Button
						theme={theme}
						style='none'
						onClick={() => logout({ returnTo: window.location.origin })}
					>
						Logout
					</Button>
					<Link href='/profile'>
						<Image src={user.picture} alt='profile picture' width={200} height={200} />
					</Link>
				</>
			)}
		</AuthButtonsWrapper>
	)
}

const AuthButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	.clip-loader {
		margin: 0 1rem;
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
		margin-left: 1rem;
	}
`

export default AuthButtons
