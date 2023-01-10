import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import styled from 'styled-components'
import PostsGrid from '../../components/posts/PostsGrid'
import { getAllPosts } from '../../utils'

function AllPostsPage() {
	const { data: posts, isLoading } = useQuery('get-posts', getAllPosts)
	const { t: translate } = useTranslation(['post', 'common'])
	const { locale } = useRouter()

	if (isLoading)
		<Wrapper>
			<h1>{translate('common:loading')}</h1>
		</Wrapper>

	return (
		<Wrapper>
			<Head>
				<title>{translate('all-posts')}</title>
			</Head>
			<h1 className={`${locale === 'en-US' && 'serif'}`}>{translate('all-posts')}</h1>
			<PostsGrid posts={posts} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;

	h1 {
		margin-bottom: 3rem;
	}
`

export async function getStaticProps({ locale }) {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery('get-posts', getAllPosts)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['common', 'nav', 'header', 'post', 'home'])),
		},
	}
}

export default AllPostsPage
