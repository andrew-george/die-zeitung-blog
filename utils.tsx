import axios from 'axios'

export async function getAllPosts() {
	const response = await axios('https://zeitung-4e991-default-rtdb.firebaseio.com/posts.json')
	return response.data
}

export async function getMostReadPosts() {
	const posts = await getAllPosts()
	const featuredArr = []

	for (const key in posts) {
		featuredArr.push(posts[key])
	}

	//- sort by reads count and get 4 most read posts
	const mostRead = featuredArr.sort((a, b) => b.reads - a.reads).slice(0, 4)

	return mostRead
}

export async function getMostRecentPost() {
	const posts = await getAllPosts()
	const currentYear = new Date().getFullYear().toString()

	const currentYearPosts = []

	//- get current year's posts
	for (const key in posts) {
		if (posts[key].year === currentYear) {
			currentYearPosts.push(posts[key])
		}
	}

	//- reduce that array to get the most recent post
	const mostRecentPost = currentYearPosts.reduce((acc, current) => {
		if (current.month < acc.month) {
			return current
		} else {
			return acc
		}
	})

	return mostRecentPost
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
