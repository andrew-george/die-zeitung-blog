import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getFeaturedPosts } from '../../utils'
import { PostDetails } from './PostDetailsTypes'
import PostsGrid from './PostsGrid'

function FeaturedPosts() {
	const [featuredPosts, setFeaturedPosts] = useState<PostDetails[]>([])

	useEffect(() => {
		async function getPosts() {
			const featuredArr = await getFeaturedPosts()
			setFeaturedPosts(featuredArr)
		}
		getPosts()
	}, [])

	return (
		<Wrapper>
			<h2>Featured Posts</h2>
			<PostsGrid posts={featuredPosts} />
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
