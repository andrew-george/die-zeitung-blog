import styled from 'styled-components'
import { PostDetails } from '../../components/posts/PostDetailsTypes'
import PostsGrid from '../../components/posts/PostsGrid'
import { getAllPosts } from '../../utils'

function AnnualFilter(props: { posts: PostDetails[]; year: string }) {
	if (!props.posts) {
		return (
			<Wrapper>
				<h1>Loading...</h1>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<h1>All Posts of {props.year}</h1>
			<PostsGrid posts={props.posts} />
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
	const { year } = context.params
	const allPosts = await getAllPosts()

	const posts = []

	for (const key in allPosts) {
		if (allPosts[key].year === year) {
			posts.push(allPosts[key])
		}
	}

	return {
		props: { posts, year },
	}
}

export async function getStaticPaths() {
	const posts = await getAllPosts()
	const paths = []

	for (const key in posts) {
		paths.push({ params: { year: posts[key].year } })
	}

	return {
		paths,
		fallback: false,
	}
}

export default AnnualFilter
