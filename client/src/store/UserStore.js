import { makeAutoObservable } from 'mobx'

export default class UserStore {
	constructor() {
		this._Auth = false
		this._User = {}
		makeAutoObservable(this)
	}

	setIsAuth(bool) {
		this._Auth = bool
	}

	setUser(user) {
		this._User = user
	}

	get isAuth() {
		return this._Auth
	}

	get user() {
		return this._User
	}
}
