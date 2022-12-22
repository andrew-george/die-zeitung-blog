import { useFormik } from 'formik'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import { subscribeToNewsletter } from '../../utils'
import Button from '../ui/Button'

import type { RootState } from '../../redux/store'

function Newsletter() {
	const [status, setStatus] = useState('')
	const theme = useSelector((store: RootState) => store.theme)

	const formik = useFormik({
		//- INITIAL VALUES
		initialValues: {
			email: '',
		},
		//- VALIDATION
		validationSchema: yup.object({
			email: yup.string().email('Invalid Email!').required('Please enter your email!'),
		}),
		//- SUBMISSION
		async onSubmit(values) {
			setStatus('loading')
			const response = await subscribeToNewsletter(values.email)

			if (response.status === 200) {
				setStatus('success')
				values.email = ''
				setTimeout(() => {
					setStatus('')
				}, 3000)
			}
		},
	})

	return (
		<Wrapper>
			<h4>Subscribe to Newsletter!</h4>
			<form className='form-control'>
				<div className='input'>
					<input
						type='email'
						name='email'
						id='email'
						placeholder='Enter your email...'
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
					{formik.errors.email && <p className='error-msg'>{formik.errors.email}</p>}
				</div>
				<Button
					type='submit'
					theme={theme}
					style='fill'
					error={formik.errors.email}
					status={status}
					disabled={formik.errors}
					onClick={formik.handleSubmit}
				>
					Subscribe
				</Button>
			</form>
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

		.input {
			position: relative;
			.error-msg {
				position: absolute;
				top: 40px;
				color: #bc3333;
				font-size: 0.8rem;
			}
			input {
				border: none;
				padding: 0.6rem;
				font-family: inherit;
				border-radius: 5px;
			}
		}
	}
`

export default Newsletter
