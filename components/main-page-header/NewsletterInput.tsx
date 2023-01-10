import { useFormik } from 'formik'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import { subscribeToNewsletter } from '../../utils'
import Button from '../ui/Button'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { RootState } from '../../redux/store'

function Newsletter() {
	const theme = useSelector((store: RootState) => store.theme)
	const { status, mutate, reset } = useMutation((email: string) => subscribeToNewsletter(email))

	const { t: translate } = useTranslation('header')
	const { locale } = useRouter()

	const formik = useFormik({
		//- INITIAL VALUES
		initialValues: {
			email: '',
		},
		//- VALIDATION
		validationSchema: yup.object({
			email: yup.string().email(translate('invalid-email')).required(translate('empty-email')),
		}),
		//- SUBMISSION
		async onSubmit(values) {
			mutate(values.email)
			formik.resetForm()
			setTimeout(() => {
				reset()
			}, 3000)
		},
	})

	return (
		<Wrapper>
			<h4 className={`${locale === 'en-US' && 'serif'}`}>{translate('subscribe-title')}</h4>
			<form className='form-control'>
				<div className='input'>
					<input
						type='email'
						name='email'
						id='email'
						placeholder={translate('email-placeholder')}
						value={formik.values.email}
						onChange={formik.handleChange}
						style={{ textAlign: `${locale === 'en-US' ? 'start' : 'end'}` }}
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
					successText='subscribed'
				>
					{translate('subscribe')}
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
		padding: 0.5rem;
	}

	.form-control {
		padding: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;

		.input {
			position: relative;
			width: 170px;
			.error-msg {
				width: 170px;
				position: absolute;
				top: 45px;
				color: #f86363;
				font-size: 0.8rem;
			}
			input {
				width: 170px;
				border: none;
				padding: 0.6rem;
				font-family: inherit;
				border-radius: 5px;
			}
		}
	}
`

export default Newsletter
