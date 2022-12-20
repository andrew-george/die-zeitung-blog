import styled from 'styled-components'
import Newsletter from './NewsletterInput'

function MainPageHeader() {
	return (
		<Wrapper>
			<div className='container'>
				<div className='description'>
					<h2>Hello, This is die Zeitung</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate nulla sint
						consequuntur ipsa nam animi deleniti sit obcaecati soluta. Molestiae eum aliquam commodi
						amet, totam laboriosam inventore esse pariatur ratione.
					</p>
				</div>
				<Newsletter />
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.header`
	background-color: #e1eee8;

	.container {
		max-width: 400px;
		height: 80%;
		height: 20rem;
		margin: 0 auto 3rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
			font-family: var(--font-dm-serif);
			font-size: 2rem;
			padding: 1rem;
		}
	}
`
export default MainPageHeader
