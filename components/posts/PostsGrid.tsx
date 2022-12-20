import Link from 'next/link'
import styled from 'styled-components'
import Card from '../ui/Card'
import { PostDetails } from './PostDetailsTypes'
import PostGridItem from './PostIGridtem'

function PostsGrid(props: { posts: PostDetails[] }) {
	return (
		<GridWrapper>
			{props.posts.map((post, index) => (
				<Link key={index} href={`/posts/${post.year}/${post.slug}`}>
					<Card>
						<PostGridItem post={post} />
					</Card>
				</Link>
			))}
		</GridWrapper>
	)
}

const GridWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	margin-bottom: 3rem;
`

export default PostsGrid
