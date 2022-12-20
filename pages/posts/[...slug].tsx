import FullPost from '../../components/posts/FullPost'
import { PostDetails } from '../../components/posts/PostDetailsTypes'
import { getAllPosts, getPostBySlug } from '../../utils'

function SinglePostPage(props: { post: PostDetails }) {
	if (!props.post) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		)
	}

	return <FullPost post={props.post} />
}

export async function getStaticProps(context) {
	const slug = context.params.slug[1]
	const post = await getPostBySlug(slug)

	return {
		props: { post },
	}
}

export async function getStaticPaths() {
	const posts = await getAllPosts()
	const paths = []

	for (const key in posts) {
		paths.push({ params: { slug: [posts[key].year, posts[key].slug] } })
	}
	return {
		paths,
		fallback: true,
	}
}

export default SinglePostPage
