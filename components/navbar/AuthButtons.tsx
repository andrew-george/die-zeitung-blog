import { useUser } from '@auth0/nextjs-auth0/client'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'
import Button from '../ui/Button'
import NavProfile from './NavProfile'

import { RootState, setUser } from '../../redux/store'

function AuthButtons() {
	const theme = useSelector((store: RootState) => store.theme)
	const dispatch = useDispatch()

	const { t: translate } = useTranslation('nav')
	const { user, isLoading } = useUser()

	useEffect(() => {
		if (!!user == false) {
			dispatch(setUser(null))
		} else {
			dispatch(setUser(user))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	if (isLoading) {
		return (
			<AuthButtonsWrapper>
				<ClipLoader
					className='clip-loader'
					size={25}
					color={`${theme === 'dark' ? '#fff' : '#000'}`}
				/>
			</AuthButtonsWrapper>
		)
	}

	return (
		<AuthButtonsWrapper>
			{!!user == true ? (
				<div className='auth'>
					<Button className='logout-btn' type='button' theme={theme} style='none'>
						<a href='/api/auth/logout'>{translate('logout')}</a>
					</Button>
					<NavProfile />
				</div>
			) : (
				<Button type='button' style='fill' theme={theme}>
					<a href='/api/auth/login'>{translate('login')}</a>
				</Button>
			)}
		</AuthButtonsWrapper>
	)
}

const AuthButtonsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	.auth {
		display: flex;
	}

	.clip-loader {
		margin: 0 1rem;
	}

	.logout-btn {
		margin-right: 1rem;
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
	}
`

export default AuthButtons
