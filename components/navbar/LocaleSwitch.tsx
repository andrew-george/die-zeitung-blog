import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Button from '../ui/Button'

function LocaleSwitch() {
	const theme = useSelector((store: RootState) => store.theme)
	const { locale, push } = useRouter()
	if (locale === 'en-US') {
		return (
			<Button
				style='none'
				theme={theme}
				type='button'
				onClick={() => push('/', '', { locale: 'ar-EG' })}
			>
				العربية
			</Button>
		)
	}
	if (locale === 'ar-EG') {
		return (
			<Button
				style='none'
				theme={theme}
				type='button'
				onClick={() => push('/', '', { locale: 'en-US' })}
			>
				EN
			</Button>
		)
	}
}

export default LocaleSwitch
