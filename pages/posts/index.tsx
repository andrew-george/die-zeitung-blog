import Head from 'next/head'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import styled from 'styled-components'
import PostsGrid from '../../components/posts/PostsGrid'
import { getAllPosts } from '../../utils'

function AllPostsPage() {
	const { data: posts, isLoading } = useQuery('get-posts', getAllPosts)

	if (isLoading)
		<Wrapper>
			<h1>Loading...</h1>
		</Wrapper>

	return (
		<Wrapper>
			<Head>
				<title>All Posts</title>
			</Head>
			<h1>All Posts</h1>
			<PostsGrid posts={posts} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;

	h1 {
		font-family: var(--font-dm-serif);
		margin-bottom: 3rem;
	}
`

export async function getStaticProps() {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery('get-posts', getAllPosts)

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	}
}

export default AllPostsPage
