import axios from 'axios'
import { PostDetails } from './components/posts/PostDetailsTypes'

//- GET
export async function getAllPosts(): Promise<PostDetails[]> {
	const response = await axios('https://zeitung-4e991-default-rtdb.firebaseio.com/posts.json')
	return Object.values(await response.data)
}

export async function getNavMenuYears() {
	const posts = await getAllPosts()
	return Array.from(new Set(posts.map(post => post.year))).sort()
}

export async function getMostReadPosts() {
	const posts = await getAllPosts()
	//- sort by reads count and get 4 most read posts
	return posts.sort((a, b) => b.reads - a.reads).slice(0, 4)
}

export async function getPostsByYear(year: number) {
	const posts = await getAllPosts()
	return posts.filter(post => post.year === year)
}

export async function getMostRecentPost() {
	const currentYear = new Date().getFullYear()
	const currentYearPosts = await getPostsByYear(currentYear)
	//- reduce that array to get the most recent post
	return currentYearPosts.reduce((acc, current) => (current.month > acc.month ? current : acc))
}

export async function getPostBySlug(slug: string) {
	const posts = await getAllPosts()
	return posts.find(post => post.slug === slug)
}

export async function getPostByUserSub(userSub) {
	const posts = await getAllPosts()
	return posts.filter(post => post.userSub === userSub)
}

export async function getPostById(id: string) {
	const posts = await getAllPosts()
	return posts.find(post => post.id === id)
}

//- MUTATIONS

//- Newsletter
export async function subscribeToNewsletter(email: string) {
	return axios.post('https://zeitung-4e991-default-rtdb.firebaseio.com/subscribers.json', { email })
}

//- Posts

//- create
export async function createPost(post: PostDetails) {
	return axios.post('https://zeitung-4e991-default-rtdb.firebaseio.com/posts.json', post)
}

//- edit
export async function editPost(obj) {
	const { data } = await axios('https://zeitung-4e991-default-rtdb.firebaseio.com/posts.json')

	let response
	for (const key in data) {
		if (data[key].id === obj.id) {
			response = axios.patch(
				`https://zeitung-4e991-default-rtdb.firebaseio.com/posts/${key}.json`,
				obj.postData
			)
		}
	}
	return response
}

//- Add one read
export async function addOneRead(obj) {
	const { data } = await axios('https://zeitung-4e991-default-rtdb.firebaseio.com/posts.json')

	let response
	for (const key in data) {
		if (data[key].id === obj.id) {
			response = axios.patch(
				`https://zeitung-4e991-default-rtdb.firebaseio.com/posts/${key}.json`,
				{ ...obj.postData, reads: obj.postData.reads + 1 }
			)
		}
	}
	return response
}

//- delete
export async function deletePost(id) {
	const { data } = await axios('https://zeitung-4e991-default-rtdb.firebaseio.com/posts.json')

	let response
	for (const key in data) {
		if (data[key].id === id) {
			response = axios.delete(`https://zeitung-4e991-default-rtdb.firebaseio.com/posts/${key}.json`)
		}
	}
	return response
}
