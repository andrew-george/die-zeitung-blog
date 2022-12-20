import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'

function Button(props: {
	children?: React.ReactNode
	style: 'fill' | 'none'
	status?: string
	error?: boolean
	onClick?: () => void
}) {
	//- conditional style returns
	if (props.error) {
		return (
			<ErrorButton>
				<BiErrorCircle /> <span>Invalid Email</span>
			</ErrorButton>
		)
	}
	if (props.status === 'success') {
		return (
			<SuccessButton>
				<AiFillCheckCircle /> <span>Subscribed</span>
			</SuccessButton>
		)
	}

	if (props.status === 'loading') {
		return (
			<LoadingButton>
				<ClipLoader size={10} />
				<span>Loading</span>
			</LoadingButton>
		)
	}

	if (props.style === 'none') {
		return <PlainButton onClick={props.onClick}>{props.children}</PlainButton>
	}

	if (props.style === 'fill') {
		return <FillButton onClick={props.onClick}>{props.children}</FillButton>
	}
}

const PlainButton = styled.button`
	padding: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	margin-left: 0.5rem;
	font-weight: 600;

	span {
		margin-left: 5px;
	}
`

const FillButton = styled(PlainButton)`
	border: 1.6px solid #000;
	background-color: #000;
	color: #fff;
`

const ErrorButton = styled(PlainButton)`
	background-color: #ff5454;
`
const LoadingButton = styled(PlainButton)`
	background-color: #f4efbd;
`
const SuccessButton = styled(PlainButton)`
	background-color: #96e096;
`

export default Button
