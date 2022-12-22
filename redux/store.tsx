import { configureStore, createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
	name: 'theme',
	initialState: 'light',
	reducers: {
		toggleTheme(state) {
			if (state === 'light') {
				state = 'dark'
				localStorage.setItem('theme', JSON.stringify(state))
				return state
			} else {
				state = 'light'
				localStorage.setItem('theme', JSON.stringify(state))
				return state
			}
		},
		setTheme(state, { payload }) {
			state = payload
			return state
		},
	},
})

export const userSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
		setUser(state, { payload }) {
			state = payload
			localStorage.setItem('user', JSON.stringify(payload))
			return state
		},
	},
})

export const store = configureStore({
	reducer: {
		theme: themeSlice.reducer,
		user: userSlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const { toggleTheme, setTheme } = themeSlice.actions
export const { setUser } = userSlice.actions
