import Image from 'next/image'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail } from 'react-icons/ai'
import styled from 'styled-components'

function Footer() {
	return (
		<FooterWrapper>
			<div className='footer-container'>
				<Image src='/images/logo-light.png' alt='logo' width={135} height={40} />
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
	min-height: 100px;
	display: flex;
	align-items: center;

	.footer-container {
		width: 90%;
		margin: auto;
		color: #fff;
		align-items: center;
		justify-content: space-between;
		display: flex;

		@media (max-width: 768px) {
			flex-direction: column;
			padding: 0.5rem 0;

			* {
				margin: 0.5rem 0;
			}
		}

		.copyrights {
			font-size: 0.6rem;

			span {
				margin-left: 4px;
				font-size: 0.7rem;
				font-weight: 700;
			}
		}
		.social-icons {
			display: flex;
			justify-content: center;
			align-items: center;
			svg {
				margin: 0 1rem;
				font-size: 1.4rem;
			}
		}
	}
`

export default Footer
