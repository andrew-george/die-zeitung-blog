import styled from 'styled-components'
import MainPageHeader from '../components/main-page-header/MainPageHeader'
import FeaturedPosts from '../components/posts/FeaturedPosts'
import FullPost from '../components/posts/FullPost'
import { PostDetails } from '../components/posts/PostDetailsTypes'
import { getMostRecentPost } from '../utils'

function HomePage(props: { mostRecentPost: PostDetails }) {
	if (!props.mostRecentPost) {
		return (
			<>
				<h1>Loading...</h1>
			</>
		)
	}

	return (
		<Wrapper>
			<MainPageHeader />
			<div className='section-title'>
				<h1>Most Recent</h1>
			</div>
			<FullPost post={props.mostRecentPost} />
			<FeaturedPosts />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	.section-title {
		width: 100%;
		display: flex;
		justify-content: center;

		h1 {
			font-family: var(--font-dm-serif);
			font-size: 1.8rem;
		}
	}
`

export async function getStaticProps() {
	const mostRecentPost = await getMostRecentPost()

	return {
		props: {
			mostRecentPost,
		},
	}
}

export default HomePage
