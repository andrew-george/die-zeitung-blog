import Image from 'next/image'
import styled from 'styled-components'
import { posts } from '../../DUMMY_DATA'
import { PostDetails } from './PostDetailsTypes'

function MainPagePost(props: { post: PostDetails }) {
	const { title, intro, image, content } = props.post
	return (
		<MainPostWrapper>
			<h1>Most Recent</h1>
			<div className='container'>
				<h1>{title}</h1>
				<p className='text'>{intro}</p>
				<Image src={image} alt='logo' width={700} height={500} />
				<p className='text'>{content}</p>
			</div>
		</MainPostWrapper>
	)
}

const MainPostWrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		font-family: var(--font-dm-serif);
		font-size: 1.8rem;
		margin-bottom: 3rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 90%;
		text-align: left;
		border-radius: 10px;
		margin-bottom: 3rem;

		h1 {
			font-family: var(--font-dm-serif);
			font-size: 2.4rem;
			margin-bottom: 2rem;
		}

		.text {
			width: 60vw;
		}
	}
`

export default MainPagePost
