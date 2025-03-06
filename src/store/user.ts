import { create } from 'zustand'
import { StoreDataTypes, UserDataTypes } from '../types/types'

interface Cart {
  users: UserDataTypes[]
  user: UserDataTypes
  cart: StoreDataTypes[]
  actionsUsers: {
    updateUsers: (newData: UserDataTypes[]) => void
  }
  actionsUser: {
    updateUser: (newData: UserDataTypes) => void
    removeUser: () => void
  }
  actionsCart: {
    updateCart: (newData: StoreDataTypes[]) => void
  }
}

const useStore = create<Cart>((set) => ({
  users: [],
  user: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    role: '',
    password: ''
  },
  cart: [],
  actionsUsers: {
    updateUsers: (newData) =>
      set(() => {
        localStorage.setItem('users', JSON.stringify(newData))
        return { users: newData }
      })
  },
  actionsUser: {
    updateUser: (newData: UserDataTypes) =>
      set(() => {
        localStorage.setItem('user', JSON.stringify(newData))
        return { user: newData }
      }),
    removeUser: () =>
      set(() => {
        localStorage.removeItem('user')
        return {
          user: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            country: '',
            address: '',
            role: '',
            password: ''
          }
        }
      })
  },
  actionsCart: {
    updateCart: (newData) =>
      set(() => {
        localStorage.setItem('cart', JSON.stringify(newData))
        return { cart: newData }
      })
  }
}))

export const useUsersSelected = () => useStore((state) => state.users)
export const useUserSelected = () => useStore((state) => state.user)
export const useCartSelected = () => useStore((state) => state.cart)
export const useUsersActions = () => useStore((state) => state.actionsUsers)
export const useUserActions = () => useStore((state) => state.actionsUser)
export const useCartActions = () => useStore((state) => state.actionsCart)
