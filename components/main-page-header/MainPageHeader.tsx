import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Newsletter from './NewsletterInput'

function MainPageHeader() {
	const { t: translate } = useTranslation('header')
	const { locale } = useRouter()

	return (
		<Wrapper>
			<div className='container'>
				<div className='description'>
					<h2 className={`${locale === 'en-US' && 'serif'}`}>{translate('header-title')}</h2>
					<p>{translate('header-text')}</p>
				</div>
				<Newsletter />
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.header`
	background-color: #98aba3;
	color: black;

	.container {
		width: 60%;
		padding: 2rem;
		margin: 0 auto 3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		@media (max-width: 768px) {
			width: 90%;
		}
	}

	.description {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 50%;
		width: 100%;
		margin-bottom: 1rem;

		h2 {
			font-size: 2rem;
			padding: 1rem;

			@media (max-width: 768px) {
				font-size: 1.3rem;
			}
		}
	}
`
export default MainPageHeader
