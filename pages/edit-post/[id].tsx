import { useUser } from '@auth0/nextjs-auth0/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import * as yup from 'yup'
import { PostDetails } from '../../components/posts/PostDetailsTypes'
import Button from '../../components/ui/Button'
import { RootState } from '../../redux/store'
import { editPost, getAllPosts, getPostById } from '../../utils'

function EditPost(props: { id; post: PostDetails }) {
	const theme = useSelector((store: RootState) => store.theme)
	const router = useRouter()

	const { mutate, status, reset } = useMutation('edit-post', editPost)

	const { user, isLoading } = useUser()

	useEffect(() => {
		if (!user) {
			router.replace('/')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function constructPostObject(values): PostDetails {
		return {
			id: props.id,
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
			reads: 10,
		}
	}

	const formik = useFormik({
		//- INITIAL VALUES
		initialValues: {
			title: props.post.title,
			intro: props.post.intro,
			image: props.post.image,
			content: props.post.content,
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
			mutate({ id: postData.id, postData })

			formik.values.title = ''
			formik.values.intro = ''
			formik.values.image = ''
			formik.values.content = ''

			setTimeout(() => {
				reset()
			}, 3000)
			router.replace(`/posts/${postData.year}/${postData.slug}`)
		},
	})

	if (isLoading || !user) {
		return (
			<Wrapper>
				<h2>Loading...</h2>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<h1>Edit Post</h1>
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
					successText='Post Edited'
				>
					Edit Post
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
export async function getStaticProps(context) {
	const { id } = context.params
	const post = await getPostById(id)

	return {
		props: { id, post },
	}
}

export async function getStaticPaths() {
	const posts = await getAllPosts()
	const paths = posts.map(post => ({
		params: {
			id: post.id,
		},
	}))

	return {
		paths,
		fallback: true,
	}
}
export default EditPost
