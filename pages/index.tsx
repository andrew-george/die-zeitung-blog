import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import styled from 'styled-components'
import MainPageHeader from '../components/main-page-header/MainPageHeader'
import FeaturedPosts from '../components/posts/FeaturedPosts'
import FullPost from '../components/posts/FullPost'
import { getMostReadPosts, getMostRecentPost } from '../utils'

function HomePage() {
	const { data: featuredPosts } = useQuery('featured-posts', getMostReadPosts)
	const { data: mostRecentPost } = useQuery('most-recent-post', getMostRecentPost)

	const { t: translate } = useTranslation(['home', 'nav'])
	const { locale } = useRouter()

	return (
		<Wrapper>
			<Head>
				<title>{translate('nav:home')}</title>
			</Head>
			<MainPageHeader />
			<div className='section-title'>
				<h1 className={`${locale === 'en-US' && 'serif'}`}>{translate('most-recent')}</h1>
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
			font-size: 1.8rem;
		}
	}
`
export async function getStaticProps({ locale }) {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery('featured-posts', getMostReadPosts)
	await queryClient.prefetchQuery('most-recent-post', getMostRecentPost)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['nav', 'header', 'post', 'home'])),
		},
	}
}
export default HomePage
