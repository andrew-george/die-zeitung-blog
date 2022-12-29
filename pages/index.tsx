import { dehydrate, QueryClient, useQuery } from 'react-query'
import styled from 'styled-components'
import MainPageHeader from '../components/main-page-header/MainPageHeader'
import FeaturedPosts from '../components/posts/FeaturedPosts'
import FullPost from '../components/posts/FullPost'
import { getMostReadPosts, getMostRecentPost } from '../utils'

function HomePage() {
	const { data: featuredPosts, isLoading: isFeaturedPostsLoading } = useQuery(
		'featured-posts',
		getMostReadPosts
	)
	const { data: mostRecentPost, isLoading: isMostRecentPostsLoading } = useQuery(
		'most-recent-post',
		getMostRecentPost
	)

	if (isMostRecentPostsLoading || isFeaturedPostsLoading) {
		return (
			<Wrapper>
				<MainPageHeader />
				<h1>Loading...</h1>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<MainPageHeader />
			<div className='section-title'>
				<h1>Most Recent</h1>
			</div>
			<FullPost post={mostRecentPost} />
			<FeaturedPosts featuredPosts={featuredPosts} />
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
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery('featured-posts', getMostReadPosts)
	await queryClient.prefetchQuery('most-recent-post', getMostRecentPost)

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	}
}
export default HomePage
