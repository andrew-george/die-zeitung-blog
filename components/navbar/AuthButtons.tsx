import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'
import Button from '../ui/Button'

import { RootState, setUser } from '../../redux/store'

function AuthButtons() {
	const theme = useSelector((store: RootState) => store.theme)
	const dispatch = useDispatch()

	const { user, error, isLoading } = useUser()

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
			{!isLoading && !user && (
				<Button style='fill' theme={theme}>
					<a href='/api/auth/login'>Login / Sign Up</a>
				</Button>
			)}
			{!isLoading && user && (
				<>
					<Button theme={theme} style='none'>
						<a href='/api/auth/logout'>Logout</a>
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
