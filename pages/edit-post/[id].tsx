import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import * as yup from 'yup'
import { PostDetails } from '../../components/posts/PostDetailsTypes'
import Button from '../../components/ui/Button'
import { RootState } from '../../redux/store'
import { editPost, getAllPosts, getPostById } from '../../utils'

function EditPost(props: { id; post: PostDetails }) {
	const { replace, locale } = useRouter()
	const { t: translate } = useTranslation('dashboard')
	const theme = useSelector((store: RootState) => store.theme)

	const { mutate, status, reset } = useMutation('edit-post', editPost, {
		onSuccess: (data, variables, context) => {
			formik.values.title = ''
			formik.values.intro = ''
			formik.values.image = ''
			formik.values.content = ''

			Swal.fire({
				toast: true,
				heightAuto: true,
				icon: 'success',
				titleText: translate('toast-edited'),
				showCancelButton: false,
				showConfirmButton: false,
				background: `${theme === 'light' ? '#fff' : '#111'}`,
				color: `${theme === 'light' ? '#111' : '#fff'}`,
				position: 'center',
				timer: 1000,
			})
			reset()
			replace(`/posts/${variables.postData.year}/${variables.postData.slug}`)
		},
	})

	const { user } = useUser()

	function constructPostObject(values): PostDetails {
		return {
			id: props.post.id,
			title: values.title,
			slug: values.title.toLowerCase().split(' ').join('-'),
			intro: values.intro,
			content: values.content,
			image: values.image,
			year: new Date().getFullYear(),
			month: new Date().getMonth(),
			author: user.name,
			userSub: user.sub,
			authorImage: user.picture,
			reads: props.post.reads,
		}
	}

	const formik = useFormik({
		//- INITIAL VALUES
		initialValues: {
			title: props.post?.title,
			intro: props.post?.intro,
			image: props.post?.image,
			content: props.post?.content,
		},
		//- VALIDATION
		validationSchema: yup.object({
			title: yup.string().required(translate('required-field')),
			intro: yup.string().required(translate('required-field')),
			image: yup.string().required(translate('required-field')).url(translate('url-error')),
			content: yup.string().required(translate('required-field')),
		}),

		//- SUBMISSION
		async onSubmit(values) {
			const postData = constructPostObject(values)
			mutate({ id: postData.id, postData })
		},
	})

	if (!props.post || !!user == false) {
		return (
			<Wrapper>
				<h2>{translate('common:loading')}</h2>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<Head>
				<title>{translate('edit-post')}</title>
			</Head>
			<h1 className={`${locale === 'en-US' && 'serif'}`}>{translate('edit-post')}</h1>
			<form onSubmit={formik.handleSubmit}>
				<div className='form-control'>
					<label htmlFor='title'>{translate('title')}</label>
					<input
						type='text'
						name='title'
						placeholder={translate('title')}
						value={formik.values.title}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={{ textAlign: `${locale === 'en-US' ? 'start' : 'end'}` }}
					/>
					{formik.touched.title && formik.errors.title && (
						<p className='error-msg'>{formik.errors.title}</p>
					)}
				</div>

				<div className='form-control'>
					<label htmlFor='intro'>{translate('intro')}</label>
					<textarea
						name='intro'
						placeholder={translate('intro')}
						rows={4}
						value={formik.values.intro}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={{ textAlign: `${locale === 'en-US' ? 'start' : 'end'}` }}
					></textarea>
					{formik.touched.intro && formik.errors.intro && (
						<p className='error-msg'>{formik.errors.intro}</p>
					)}
				</div>

				<div className='form-control'>
					<label htmlFor='image'>{translate('image')}</label>
					<input
						type='url'
						name='image'
						placeholder={translate('image-placeholder')}
						value={formik.values.image}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={{ textAlign: `${locale === 'en-US' ? 'start' : 'end'}` }}
					/>
					{formik.touched.image && formik.errors.image && (
						<p className='error-msg'>{formik.errors.image}</p>
					)}
				</div>

				<div className='form-control'>
					<label htmlFor='content'>{translate('content')}</label>
					<textarea
						name='content'
						placeholder={translate('content')}
						rows={6}
						value={formik.values.content}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						style={{ textAlign: `${locale === 'en-US' ? 'start' : 'end'}` }}
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
					successText={translate('post-edited')}
				>
					{translate('edit-post')}
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
			width: 100%;
			position: absolute;
			bottom: -25px;
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

export async function getStaticProps({ params, locale }) {
	const { id } = params
	const post = await getPostById(id)

	return {
		props: {
			id,
			post,
			...(await serverSideTranslations(locale, ['common', 'nav', 'post', 'home', 'dashboard'])),
		},
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
export default withPageAuthRequired(EditPost)
