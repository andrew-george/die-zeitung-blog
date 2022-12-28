import { useEffect } from 'react'
import { dehydrate, QueryClient, useMutation, useQuery } from 'react-query'
import FullPost from '../../components/posts/FullPost'
import { addOneRead, getAllPosts, getPostBySlug } from '../../utils'

function SinglePostPage(props: { slug: string }) {
	const { data: post, isLoading } = useQuery(['single-post', props.slug], () =>
		getPostBySlug(props.slug)
	)

	const { mutate } = useMutation('add-one-read', addOneRead)

	if (isLoading) <h1>Loading...</h1>

	useEffect(() => {
		mutate({ id: post.id, postData: post })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <FullPost post={post} />
}

export async function getStaticProps(context) {
	const slug = context.params.slug[1]

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['single-post', slug], () => getPostBySlug(slug))

	return {
		props: { dehydratedState: dehydrate(queryClient), slug },
	}
}

export async function getStaticPaths() {
	const posts = await getAllPosts()
	const paths = posts.map(post => ({
		params: {
			slug: [post.year.toString(), post.slug],
		},
	}))

	return {
		paths,
		fallback: true,
	}
}

export default SinglePostPage
