import { useState } from 'react'
import styled from 'styled-components'
import { subscribeToNewsletter } from '../../utils'
import Button from '../ui/Button'

function Newsletter() {
	const [enteredEmail, setEnteredEmail] = useState('')
	const [error, setError] = useState(false)
	const [status, setStatus] = useState('')

	async function subscriptionHandler() {
		if (!enteredEmail || !enteredEmail.includes('@')) {
			setError(true)
			return
		} else {
			setStatus('loading')
			const response = await subscribeToNewsletter(enteredEmail)

			if (response.status === 200) {
				setStatus('success')
				setEnteredEmail('')

				setTimeout(() => {
					setStatus('')
				}, 3000)
			}
		}
	}

	return (
		<Wrapper>
			<h4>Subscribe to Newsletter!</h4>
			<div className='form-control'>
				<input
					type='email'
					name='newsletter'
					placeholder='Enter your email...'
					value={enteredEmail}
					onChange={e => {
						setError(false)
						setEnteredEmail(e.target.value)
					}}
				/>
				<Button style='fill' error={error} status={status} onClick={subscriptionHandler}>
					Subscribe
				</Button>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 30%;
	width: 100%;

	h4 {
		font-family: var(--font-dm-serif);
		padding: 0.5rem;
	}

	.form-control {
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;

		input {
			border: none;
			padding: 0.6rem;
			font-family: inherit;
			border-radius: 5px;
		}
	}
`

export default Newsletter
