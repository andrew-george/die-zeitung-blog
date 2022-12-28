import styled from 'styled-components'
import { PostDetails } from './PostDetailsTypes'
import PostsGrid from './PostsGrid'

function FeaturedPosts(props: { featuredPosts: PostDetails[] }) {
	return (
		<Wrapper>
			<h2>Most Read</h2>
			<PostsGrid posts={props.featuredPosts} />
		</Wrapper>
	)
}

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 90%;
	margin: 0 auto 3rem;

	h2 {
		font-family: var(--font-dm-serif);
		font-size: 1.8rem;
		margin-bottom: 3rem;
	}
`

export default FeaturedPosts
