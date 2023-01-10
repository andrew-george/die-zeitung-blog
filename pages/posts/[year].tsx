import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import styled from 'styled-components'
import PostsGrid from '../../components/posts/PostsGrid'
import { getAllPosts, getPostsByYear } from '../../utils'

function AnnualFilter(props: { year: string }) {
	const { data: posts, isLoading } = useQuery(['posts-by-year', props.year], () =>
		getPostsByYear(+props.year)
	)

	const { t: translate } = useTranslation(['post', 'common'])
	const { locale } = useRouter()

	if (isLoading)
		<Wrapper>
			<h1>{translate('common:loading')}</h1>
		</Wrapper>

	return (
		<Wrapper>
			<Head>
				<title>
					{translate('all-posts-of')}{' '}
					{Intl.NumberFormat(locale, {
						useGrouping: false,
					}).format(+props.year)}
				</title>
			</Head>
			<h1 className={`${locale === 'en-US' && 'serif'}`}>
				{translate('all-posts-of')}{' '}
				{Intl.NumberFormat(locale, {
					useGrouping: false,
				}).format(+props.year)}
			</h1>
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

export async function getStaticProps({ locale, params }) {
	const year = params.year

	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(['posts-by-year', year], () => getPostsByYear(+year))

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
			year,
			...(await serverSideTranslations(locale, ['common', 'nav', 'header', 'post', 'home'])),
		},
	}
}

export async function getStaticPaths() {
	const posts = await getAllPosts()

	//- can be refactored to generate paths dynamically for each locale by getting locales array from next router and map a new array of paths for each locale
	const enPaths = posts.map(post => ({
		params: {
			year: post.year.toString(),
		},
		locale: 'en-US',
	}))
	const arPaths = posts.map(post => ({
		params: {
			year: post.year.toString(),
		},
		locale: 'ar-EG',
	}))

	const paths = [...enPaths, ...arPaths]

	return {
		paths,
		fallback: false,
	}
}

export default AnnualFilter
