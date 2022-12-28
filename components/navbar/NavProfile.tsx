import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import Link from 'next/link'

function NavProfile() {
	const { user } = useUser()

	return (
		<Link href='/dashboard'>
			<Image src={user.picture} alt='profile picture' width={200} height={200} />
		</Link>
	)
}

export default NavProfile
