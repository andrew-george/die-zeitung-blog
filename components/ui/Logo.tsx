import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

function Logo(props: { theme: string }) {
	return (
		<Wrapper>
			<Link href='/'>
				<Image
					src={`/images/logo-${props.theme === 'dark' ? 'light' : 'dark'}.png`}
					alt='logo'
					width={135}
					height={40}
				/>
			</Link>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	a {
		display: flex;
		align-items: center;
	}
`

export default Logo
