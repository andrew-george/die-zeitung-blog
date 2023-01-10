import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { PostDetails } from './PostDetailsTypes'

function PostGridItem(props: { post: PostDetails }) {
	const { id, title, intro, content, image, year, month, author, authorImage, reads } = props.post

	const { locale } = useRouter()
	const { t: translate } = useTranslation('post')

	const formattedDate = new Date(+year, +month).toLocaleDateString(locale, {
		month: 'long',
		year: 'numeric',
	})

	return (
		<Wrapper>
			<Image className='cover-img' src={image} alt={title} width={350} height={200} />
			<div className='content'>
				<h4>{title}</h4>
				<p className='intro'>
					{intro.split(' ').slice(0, 7).join(' ')}
					<span>...{translate('read-more')}</span>
				</p>
				<p className='date'>
					{translate('posted-on')} {formattedDate}
				</p>
				<p className='reads'>
					{Intl.NumberFormat(locale, {
						useGrouping: false,
					}).format(reads)}{' '}
					{translate('reads')}
				</p>
				<div className='author'>
					<Image src={authorImage} alt={author} width={200} height={200} />
					<p>{author}</p>
				</div>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	position: relative;
	&:hover .content {
		opacity: 1;
	}

	.content {
		opacity: 0;
		width: 350px;
		padding: 1rem;
		position: absolute;
		transition: 0.2s ease all;
		transform: translateY(-200px);

		@media (max-width: 768px) {
			opacity: 1;
		}

		* {
			text-shadow: 3px 3px 7px #000000;
			margin: 5px 0;
		}

		.intro {
			font-size: 0.7rem;

			span {
				font-weight: 700;
			}
		}

		.date {
			font-size: 0.7rem;
		}

		.author {
			display: flex;
			align-items: center;
			p {
				font-size: 0.8rem;
				font-weight: 700;
			}
			img {
				width: 35px;
				height: 35px;
				border-radius: 50%;
				object-fit: cover;
				margin-right: 10px;
			}
		}

		.reads {
			font-size: 0.8rem;
			font-weight: 700;
		}
	}

	.cover-img {
		object-fit: cover;
		border-radius: 5px;
	}
`

export default PostGridItem
