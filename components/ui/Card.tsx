import React from 'react'
import styled from 'styled-components'

function Card(props: { children: React.ReactNode }) {
	return <CardWrapper>{props.children}</CardWrapper>
}

const CardWrapper = styled.div`
	box-shadow: 10px 10px 30px #00000044;
	color: #fff;
	margin: 1rem;
	border-radius: 5px;
	height: 200px;
	width: 350px;
	cursor: pointer;
	transition: 0.3s ease all;

	&:hover {
		transform: scale(103%);
	}
`

export default Card
