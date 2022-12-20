import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import Button from '../ui/Button'

function AuthButtons() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	return (
		<AuthButtonsWrapper>
			{!isLoggedIn && (
				<>
					<Button style='none'>Login</Button>
					<Button style='fill'>Sign Up</Button>
				</>
			)}
			{isLoggedIn && (
				<>
					<Button style='none'>Logout</Button>
					<Image src='/images/Original.jpg' alt='profile' width={200} height={200} />
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
