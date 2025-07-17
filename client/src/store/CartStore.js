import { makeAutoObservable } from 'mobx'

export default class CartStore {
  items = []

  constructor() {
    makeAutoObservable(this)
  }

  addItem(skin) {
    const existing = this.items.find(i => i.id === skin.id)
    if (existing) {
      existing.quantity += 1
    } else {
      this.items.push({ ...skin, quantity: 1 })
    }
  }

  removeItem(id) {
    this.items = this.items.filter(i => i.id !== id)
  }

  increment(id) {
    const item = this.items.find(i => i.id === id)
    if (item) item.quantity += 1
  }

  decrement(id) {
    const item = this.items.find(i => i.id === id)
    if (item && item.quantity > 1) {
      item.quantity -= 1
    } else {
      this.removeItem(id)
    }
  }

  clearCart() {
    this.items = []
  }

  get totalPrice() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  }

  get totalCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0)
  }
}
