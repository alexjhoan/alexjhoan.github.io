import { create } from 'zustand'
import { StoreDataTypes, UserDataTypes } from '../types/types'

/**
 *
 *
 * @interface Cart
 * @typedef {Cart}
 */
interface Cart {
  /**
   *
   *
   * @type {UserDataTypes[]}
   */
  users: UserDataTypes[]
  /**
   *
   *
   * @type {UserDataTypes}
   */
  user: UserDataTypes
  /**
   *
   *
   * @type {StoreDataTypes[]}
   */
  cart: StoreDataTypes[]
  /**
   *
   *
   * @type {{
   *     updateUsers: (newData: UserDataTypes[]) => void
   *   }}
   */
  actionsUsers: {
    updateUsers: (newData: UserDataTypes[]) => void
  }
  /**
   *
   *
   * @type {{
   *     updateUser: (newData: UserDataTypes) => void
   *     removeUser: () => void
   *   }}
   */
  actionsUser: {
    updateUser: (newData: UserDataTypes) => void
    removeUser: () => void
  }
  /**
   *
   *
   * @type {{
   *     updateCart: (newData: StoreDataTypes[]) => void
   *   }}
   */
  actionsCart: {
    updateCart: (newData: StoreDataTypes[]) => void
  }
}

/**
 *
 *
 * @type {UseBoundStore<StoreApi<Cart>>}
 */
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

/**
 *
 *
 * @returns {UserDataTypes[]}
 */
export const useUsersSelected = () => useStore((state) => state.users)
/**
 *
 *
 * @returns {UserDataTypes}
 */
export const useUserSelected = () => useStore((state) => state.user)
/**
 *
 *
 * @returns {StoreDataTypes[]}
 */
export const useCartSelected = () => useStore((state) => state.cart)
/**
 *
 *
 * @returns {{ updateUsers: (newData: UserDataTypes[]) => void; }}
 */
export const useUsersActions = () => useStore((state) => state.actionsUsers)
/**
 *
 *
 * @returns {{ updateUser: (newData: UserDataTypes) => void; removeUser: () => void; }}
 */
export const useUserActions = () => useStore((state) => state.actionsUser)
/**
 *
 *
 * @returns {{ updateCart: (newData: StoreDataTypes[]) => void; }}
 */
export const useCartActions = () => useStore((state) => state.actionsCart)
