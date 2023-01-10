import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useEffect } from 'react'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import FullPost from '../../components/posts/FullPost'
import { addOneRead, getAllPosts, getPostBySlug } from '../../utils'

function SinglePostPage(props: { slug: string }) {
	const { data: post, isLoading } = useQuery(['single-post', props.slug], () =>
		getPostBySlug(props.slug)
	)

	const { mutate } = useMutation('add-one-read', addOneRead)

	const { t: translate } = useTranslation(['post', 'common'])

	useEffect(() => {
		mutate({ id: post.id, postData: post })
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (isLoading) {
		return <h1>{translate('common:loading')}</h1>
	}

	return (
		<>
			<Head>
				<title>{post.title}</title>
			</Head>
			<FullPost post={post} />
		</>
	)
}

export async function getStaticProps(context) {
	const slug = context.params.slug[1]

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['single-post', slug], () => getPostBySlug(slug))

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			slug,
			...(await serverSideTranslations(context.locale, [
				'common',
				'nav',
				'header',
				'post',
				'home',
			])),
		},
	}
}

export async function getStaticPaths() {
	const posts = await getAllPosts()

	//- can be refactored to generate paths dynamically for each locale by getting locales array from next router and map a new array of paths for each locale
	const enPaths = posts.map(post => ({
		params: {
			slug: [post.year.toString(), post.slug],
		},
		locale: 'en-US',
	}))
	const arPaths = posts.map(post => ({
		params: {
			slug: [post.year.toString(), post.slug],
		},
		locale: 'ar-EG',
	}))

	const paths = [...enPaths, ...arPaths]

	return {
		paths,
		fallback: true,
	}
}

export default SinglePostPage
