import styled from 'styled-components'
import { PostDetails } from '../../components/posts/PostDetailsTypes'
import PostsGrid from '../../components/posts/PostsGrid'
import { getAllPosts } from '../../utils'

function AllPostsPage(props: { posts: PostDetails[] }) {
	if (!props.posts) {
		return (
			<Wrapper>
				<h1>Loading...</h1>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<h1>All Posts</h1>
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

export async function getStaticProps() {
	const allPosts = await getAllPosts()

	const posts = []

	for (const key in allPosts) {
		posts.push(allPosts[key])
	}

	return {
		props: { posts },
	}
}

export default AllPostsPage
