import { useTranslation } from 'next-i18next'
import React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import ClipLoader from 'react-spinners/ClipLoader'
import styled from 'styled-components'

function Button(props: {
	children?: React.ReactNode
	style: 'fill' | 'none'
	status?: string
	successText?: string
	error?: any
	theme: string
	type: 'button' | 'submit'
	disabled?: any
	className?: string
	onClick?: () => void
}) {
	const { t: translate } = useTranslation('header')
	//- conditional style returns
	if (props.error) {
		return (
			<ErrorButton className={props?.className} type={props.type} disabled={props.disabled}>
				<BiErrorCircle />
				<span>{translate('subscribe')}</span>
			</ErrorButton>
		)
	}
	if (props.status === 'success') {
		return (
			<SuccessButton className={props?.className} type={props.type}>
				<AiFillCheckCircle /> <span>{translate(props.successText)}</span>
			</SuccessButton>
		)
	}

	if (props.status === 'loading') {
		return (
			<LoadingButton className={props?.className} type={props.type}>
				<ClipLoader size={10} />
			</LoadingButton>
		)
	}

	if (props.style === 'none' && props.theme === 'dark') {
		return (
			<DarkPlainButton className={props?.className} type={props.type} onClick={props.onClick}>
				{props.children}
			</DarkPlainButton>
		)
	}
	if (props.style === 'none' && props.theme === 'light') {
		return (
			<PlainButton className={props?.className} type={props.type} onClick={props.onClick}>
				{props.children}
			</PlainButton>
		)
	}

	if (props.style === 'fill' && props.theme === 'dark') {
		return (
			<DarkFillButton className={props?.className} type={props.type} onClick={props.onClick}>
				{props.children}
			</DarkFillButton>
		)
	}
	if (props.style === 'fill' && props.theme === 'light') {
		return (
			<LightFillButton className={props?.className} type={props.type} onClick={props.onClick}>
				{props.children}
			</LightFillButton>
		)
	}
}

const PlainButton = styled.button`
	padding: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	margin-left: 0.5rem;
	min-width: 60px;
	min-height: 40px;
	font-weight: 600;

	span {
		margin-left: 5px;
	}
`
const DarkPlainButton = styled(PlainButton)`
	color: white;
`

const LightFillButton = styled(PlainButton)`
	border: 1.6px solid #000;
	background-color: #000;
	color: #fff;
`
const DarkFillButton = styled(PlainButton)`
	border: 1.6px solid #fff;
	background-color: #fff;
	color: #000;
`

const ErrorButton = styled(PlainButton)`
	background-color: #d34d4d;
`
const LoadingButton = styled(PlainButton)`
	background-color: #f4efbd;
`
const SuccessButton = styled(PlainButton)`
	background-color: #96e096;
`

export default Button
