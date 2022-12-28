import { dehydrate, QueryClient, useQuery } from 'react-query'
import styled from 'styled-components'
import PostsGrid from '../../components/posts/PostsGrid'
import { getAllPosts, getPostsByYear } from '../../utils'

function AnnualFilter(props: { year: string }) {
	const { data: posts, isLoading } = useQuery(['posts-by-year', props.year], () =>
		getPostsByYear(+props.year)
	)

	if (isLoading)
		<Wrapper>
			<h1>Loading...</h1>
		</Wrapper>

	return (
		<Wrapper>
			<h1>All Posts of {props.year}</h1>
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

export async function getStaticProps(context) {
	const year = context.params.year

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['posts-by-year', year], () => getPostsByYear(+year))

	return {
		props: { dehydratedState: dehydrate(queryClient), year },
	}
}

export async function getStaticPaths() {
	const posts = await getAllPosts()
	const paths = posts.map(post => ({
		params: {
			year: post.year.toString(),
		},
	}))

	return {
		paths,
		fallback: false,
	}
}

export default AnnualFilter
