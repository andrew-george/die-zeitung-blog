import Image from 'next/image'
import styled from 'styled-components'
import { PostDetails } from './PostDetailsTypes'

function PostGridItem(props: { post: PostDetails }) {
	const { id, title, intro, content, image, year, month, author, authorImage, isFeatured } =
		props.post

	const formattedDate = new Date(+year, +month - 1).toLocaleDateString('en-US', {
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
					<span>...Read more</span>
				</p>
				<p className='date'>Posted on {formattedDate}</p>
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
		padding: 1rem;
		position: absolute;
		transition: 0.2s ease all;
		transform: translateY(-160px);

		* {
			text-shadow: 3px 3px 7px #000000;
			margin: 5px 0;
		}

		.intro {
			font-size: 0.8rem;

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
	}

	.cover-img {
		object-fit: cover;
		border-radius: 5px;
	}
`

export default PostGridItem
