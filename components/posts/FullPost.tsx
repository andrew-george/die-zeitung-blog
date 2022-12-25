import Image from 'next/image'
import styled from 'styled-components'
import { PostDetails } from './PostDetailsTypes'

function FullPost(props: { post: PostDetails }) {
	const { year, month, title, author, authorImage, intro, image, content } = props.post

	const formattedDate = new Date(+year, +month - 1).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	})

	return (
		<Wrapper>
			<h1>{title}</h1>
			<div className='details'>
				<div className='image'>
					<Image src={authorImage} alt={author} width={100} height={100} />
				</div>
				<p>{author}</p>
				<p className='date'>Posted on {formattedDate}</p>
			</div>
			<p className='text'>{intro}</p>
			<Image src={image} alt='logo' width={700} height={500} />
			<p className='text'>{content}</p>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: left;
	margin: 3rem auto;
	width: 80%;

	h1 {
		font-family: var(--font-dm-serif);
		font-size: 2.4rem;
		margin-bottom: 2rem;

		@media (max-width: 768px) {
			font-size: 1.5rem;
			text-align: center;
		}
	}

	.details {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;

		.image {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 0.8rem;
			height: 70px;
		}

		p {
			font-weight: 700;
		}

		img {
			width: 70px;
			height: 70px;
			border-radius: 50%;
			object-fit: cover;
		}
	}

	.date {
		font-size: 0.7rem;
		margin-top: 0.5rem;
	}

	.author {
		display: flex;
		align-items: center;
		flex-direction: column;
		height: 50px;
	}

	.text {
		width: 40vw;
		font-weight: 500;

		@media (max-width: 768px) {
			width: 80vw;
		}
	}

	img {
		margin: 3rem 0;

		@media (max-width: 768px) {
			width: 100%;
			height: fit-content;
		}
	}
`

export default FullPost
