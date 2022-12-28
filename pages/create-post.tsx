import { useUser } from '@auth0/nextjs-auth0/client'
import { useFormik } from 'formik'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import { PostDetails } from '../components/posts/PostDetailsTypes'
import Button from '../components/ui/Button'
import { RootState } from '../redux/store'
import { createPost } from '../utils'

function CreatePost() {
	const theme = useSelector((store: RootState) => store.theme)

	const { mutate, status, reset } = useMutation('create-post', createPost)
	const router = useRouter()

	const { user } = useUser()

	useEffect(() => {
		if (!user) {
			router.replace('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function constructPostObject(values): PostDetails {
		return {
			id: nanoid(4),
			slug: values.title.toLowerCase().split(' ').join('-'),
			title: values.title,
			intro: values.intro,
			content: values.content,
			image: values.image,
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
			author: user.name,
			userSub: user.sub,
			authorImage: user.picture,
			reads: 0,
		}
	}

	const formik = useFormik({
		//- INITIAL VALUES
		initialValues: {
			title: '',
			intro: '',
			image: '',
			content: '',
		},
		//- VALIDATION
		validationSchema: yup.object({
			title: yup.string().required(),
			intro: yup.string().required(),
			image: yup.string().required().url(),
			content: yup.string().required(),
		}),

		//- SUBMISSION
		async onSubmit(values) {
			const postData = constructPostObject(values)
			mutate(postData)
			formik.resetForm()
			setTimeout(() => {
				reset()
			}, 3000)
			router.replace(`/posts/${postData.year}/${postData.slug}`)
		},
	})

	if (!user) {
		return (
			<Wrapper>
				<h1>Loading...</h1>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<h1>Create Post</h1>
			<form onSubmit={formik.handleSubmit}>
				<div className='form-control'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						placeholder='title'
						value={formik.values.title}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.title && formik.errors.title && (
						<p className='error-msg'>{formik.errors.title}</p>
					)}
				</div>

				<div className='form-control'>
					<label htmlFor='intro'>Intro</label>
					<textarea
						name='intro'
						placeholder='intro'
						rows={4}
						value={formik.values.intro}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					></textarea>
					{formik.touched.intro && formik.errors.intro && (
						<p className='error-msg'>{formik.errors.intro}</p>
					)}
				</div>

				<div className='form-control'>
					<label htmlFor='image'>Image</label>
					<input
						type='url'
						name='image'
						placeholder='enter image url from unsplash.com'
						value={formik.values.image}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.image && formik.errors.image && (
						<p className='error-msg'>{formik.errors.image}</p>
					)}
				</div>

				<div className='form-control'>
					<label htmlFor='content'>Content</label>
					<textarea
						name='content'
						placeholder='content'
						rows={6}
						value={formik.values.content}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					></textarea>
					{formik.touched.content && formik.errors.content && (
						<p className='error-msg'>{formik.errors.content}</p>
					)}
				</div>

				<Button
					status={status}
					disabled={formik.errors}
					style='fill'
					theme={theme}
					type='submit'
					successText='Post Created'
				>
					Create
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
	width: 90%;
	margin: 0 auto;

	h1 {
		font-family: var(--font-dm-serif);
		margin-bottom: 3rem;
	}

	form {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		button {
			margin-bottom: 3rem;
		}
	}

	.form-control {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 2rem;
		position: relative;

		.error-msg {
			position: absolute;
			bottom: -20px;
			color: #f86363;
			font-size: 0.8rem;
		}
	}

	label {
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	textarea {
		resize: none;
		border: 1px solid;
		border-radius: 5px;
		font-family: var(--font-inter);
		padding: 10px;
	}

	input {
		padding: 0.6rem;
		font-family: inherit;
		resize: none;
		border: 1px solid;
		border-radius: 5px;
	}
`

export default CreatePost
