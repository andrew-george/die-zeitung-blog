import axios from 'axios'

export async function getAllPosts() {
	const response = await axios('https://zeitung-4e991-default-rtdb.firebaseio.com/posts.json')
	return response.data
}

export async function getFeaturedPosts() {
	const posts = await getAllPosts()
	const featuredArr = []

	for (const key in posts) {
		if (posts[key].isFeatured === true) {
			featuredArr.push(posts[key])
		}
	}
	return featuredArr
}

export async function getPostBySlug(slug: string) {
	const posts = await getAllPosts()

	let post

	for (const key in posts) {
		if (posts[key].slug === slug) {
			post = posts[key]
		}
	}
	return post
}

export async function subscribeToNewsletter(email: string) {
	const response = await axios.post(
		'https://zeitung-4e991-default-rtdb.firebaseio.com/subscribers.json',
		{ email }
	)
	return response
}
