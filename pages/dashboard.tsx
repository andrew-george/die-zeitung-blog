import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import PostsGrid from '../components/posts/PostsGrid'
import Button from '../components/ui/Button'
import { RootState } from '../redux/store'
import { getPostByUserSub } from '../utils'

function Dashboard() {
	const theme = useSelector((store: RootState) => store.theme)
	const { user } = useUser()
	const { locale } = useRouter()
	const { t: translate } = useTranslation(['dashboard', 'common'])
	const { data: userPosts, isLoading } = useQuery('user-posts', () => getPostByUserSub(user?.sub))

	if (isLoading || !!user == false) {
		return (
			<Wrapper>
				<h2>{translate('common:loading')}</h2>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<Head>
				<title>{translate('dashboard')}</title>
			</Head>
			<div className='user-info'>
				<h1 className={`title ${locale === 'en-US' && 'serif'}`}>{translate('dashboard')}</h1>
				<h2 className='user-greeting'>
					{translate('hello')}, <p>{user?.name}</p>
				</h2>
				<Image src={user?.picture} alt='profile picture' width={100} height={100} />
				<Link href='/create-post'>
					<Button className='add-btn' style='fill' theme={theme} type='button'>
						<FaPlus />
						{translate('create-post')}
					</Button>
				</Link>
			</div>
			<div className='posts'>
				<h2 className={`title ${locale === 'en-US' && 'serif'}`}>{translate('your-posts')}</h2>
				{userPosts ? <PostsGrid posts={userPosts} /> : <h2>{translate('common:loading')}</h2>}
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.user-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 6rem;

		.title {
			margin-bottom: 3rem;
		}
		.user-greeting {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			p {
				font-size: 2rem;
				margin-bottom: 3rem;
				font-family: var(--font-dm-serif);
			}
		}

		img {
			border-radius: 50%;
			margin-bottom: 3rem;
		}

		.add-btn {
			svg {
				margin-right: 5px;
			}
		}
	}

	.posts {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.title {
			margin-bottom: 3rem;
		}
	}
`

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common', 'nav', 'post', 'home', 'dashboard'])),
		},
	}
}

export default withPageAuthRequired(Dashboard)
