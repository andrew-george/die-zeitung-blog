import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { PostDetails } from './PostDetailsTypes'
import PostsGrid from './PostsGrid'

function FeaturedPosts(props: { featuredPosts: PostDetails[] }) {
	const { t: translate } = useTranslation('home')
	const { locale } = useRouter()

	return (
		<Wrapper>
			<h2 className={`${locale === 'en-US' && 'serif'}`}>{translate('most-read')}</h2>
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
		font-size: 1.8rem;
		margin-bottom: 3rem;
	}
`

export default FeaturedPosts
