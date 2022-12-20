import MainPageHeader from '../components/main-page-header/MainPageHeader'
import FeaturedPosts from '../components/posts/FeaturedPosts'
import MainPagePost from '../components/posts/MainPagePost'
import { PostDetails } from '../components/posts/PostDetailsTypes'
import { getAllPosts } from '../utils'

function HomePage(props: { mostRecentPost: PostDetails }) {
	return (
		<>
			<MainPageHeader />
			<MainPagePost post={props.mostRecentPost} />
			<FeaturedPosts />
		</>
	)
}

export async function getStaticProps() {
	const posts = await getAllPosts()

	//TODO=> Logic to find the most recent post

	const mostRecentPost = posts.p3

	return {
		props: {
			mostRecentPost,
		},
	}
}

export default HomePage
