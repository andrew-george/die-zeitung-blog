import Image from 'next/image'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail } from 'react-icons/ai'
import styled from 'styled-components'

function Footer() {
	return (
		<FooterWrapper>
			<div className='footer-container'>
				<Image src='/images/logo-light.png' alt='logo' width={1060} height={330} />
				<p className='copyrights'>
					&copy; Designed & Developed by<span>Andrew Berty</span>
				</p>
				<div className='social-icons'>
					<a href='https://github.com/andrew-george'>
						<AiOutlineGithub />
					</a>
					<a href='https://www.linkedin.com/in/andrew-berty/'>
						<AiOutlineLinkedin />
					</a>
					<a href='mailto: andrewgeorgeberty@gmail.com'>
						<AiOutlineMail />
					</a>
				</div>
			</div>
		</FooterWrapper>
	)
}

const FooterWrapper = styled.footer`
	background-color: #000;
	height: 100px;
	display: flex;
	align-items: center;

	.footer-container {
		width: 90%;
		margin: auto;
		color: #fff;
		align-items: center;
		justify-content: space-between;
		display: flex;
	}

	img {
		max-height: 40px;
		max-width: 135px;
	}

	.copyrights {
		font-size: 0.6rem;

		span {
			margin-left: 4px;
			font-size: 0.7rem;
			font-weight: 700;
		}
	}

	svg {
		margin-left: 1rem;
		font-size: 1.4rem;
	}
`

export default Footer
