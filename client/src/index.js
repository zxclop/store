import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SkinStore from './store/SkinStore'
import UserStore from './store/UserStore'
import CartStore from './store/CartStore'

export const Context = createContext(null)

const userStore = new UserStore()
const skinStore = new SkinStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Context.Provider
		value={{
			user: userStore,
			skin: skinStore,
			cart:  new CartStore(),
		}}
	>
		<App />
	</Context.Provider>
)
