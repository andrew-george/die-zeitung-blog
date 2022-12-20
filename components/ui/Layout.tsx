import styled from 'styled-components'
import Navbar from '../navbar/Navbar'
import Footer from './Footer'

function Layout(props: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<ChildrenWrapper>{props.children}</ChildrenWrapper>
			<Footer />
		</>
	)
}

const ChildrenWrapper = styled.main`
	min-height: calc(100vh - 200px);
`

export default Layout
