import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

function Logo() {
	return (
		<Wrapper>
			<Link href='/'>
				<Image src='/images/logo.png' alt='logo' width={1060} height={330} />
			</Link>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	a {
		display: flex;
		align-items: center;
	}

	img {
		max-height: 40px;
		max-width: 135px;
	}
`

export default Logo
