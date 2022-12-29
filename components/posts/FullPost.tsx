import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { RootState } from '../../redux/store'
import { deletePost } from '../../utils'
import Button from '../ui/Button'

function FullPost(props: { post }) {
	const { year, month, title, author, authorImage, intro, image, content, id, userSub, reads } =
		props.post

	const { user } = useUser()

	const router = useRouter()

	const { mutate } = useMutation('delete-post', deletePost, {
		onSuccess: () => {
			Swal.fire({
				toast: true,
				heightAuto: true,
				icon: 'success',
				titleText: 'Post has been deleted!',
				showCancelButton: false,
				showConfirmButton: false,
				background: `${theme === 'light' ? '#fff' : '#111'}`,
				color: `${theme === 'light' ? '#111' : '#fff'}`,
				position: 'center',
				timer: 1000,
			})
			router.replace('/dashboard')
		},
	})

	const theme = useSelector((store: RootState) => store.theme)

	const formattedDate = new Date(year, month - 1).toLocaleDateString('en-US', {
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
				<p className='reads'>{reads} reads</p>
			</div>
			{userSub === user?.sub && (
				<div className='btn-container'>
					<Link href={`/edit-post/${props.post.id}`}>
						<Button className='action-btn edit-btn' style='fill' theme={theme} type='button'>
							<FaEdit />
							Edit
						</Button>
					</Link>
					<Button
						className='action-btn delete-btn'
						style='fill'
						theme={theme}
						type='button'
						onClick={() => {
							Swal.fire({
								title: 'Are you sure?',
								text: "You won't be able to revert this!",
								showCancelButton: true,
								confirmButtonColor: '#d34d4d',
								cancelButtonColor: '#b2b2b2',
								confirmButtonText: 'Yes, delete it!',
								color: `${theme === 'light' ? '#111' : '#fff'}`,
								background: `${theme === 'light' ? '#fff' : '#111'}`,
							}).then(result => {
								if (result.isConfirmed) {
									mutate(id)
								}
							})
						}}
					>
						<FaTrash />
						Delete
					</Button>
				</div>
			)}
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
	.btn-container {
		display: flex;
		justify-content: center;
		align-items: center;

		.action-btn {
			margin-bottom: 3rem;
			svg {
				margin-right: 5px;
			}
		}
	}

	.date {
		font-size: 0.8rem;
		margin-top: 0.5rem;
	}

	.reads {
		font-size: 0.8rem;
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
