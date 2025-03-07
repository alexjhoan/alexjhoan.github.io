import { create } from 'zustand'
import { StoreDataTypes } from '../types/types'

/**
 *
 *
 * @interface Store
 * @typedef {Store}
 */
interface Store {
  /**
   *
   *
   * @type {StoreDataTypes[]}
   */
  data: StoreDataTypes[]
  /**
   *
   *
   * @type {string[]}
   */
  categories: string[]
  /**
   *
   *
   * @type {string}
   */
  category: string
  /**
   *
   *
   * @type {{
   *     updateData: (newData: StoreDataTypes[]) => void
   *     updateCategories: (newData: string[]) => void
   *     updateCategory: (newData: string) => void
   *   }}
   */
  actions: {
    updateData: (newData: StoreDataTypes[]) => void
    updateCategories: (newData: string[]) => void
    updateCategory: (newData: string) => void
  }
}

/**
 *
 *
 * @type {UseBoundStore<StoreApi<Store>>}
 */
const useStore = create<Store>((set) => ({
  data: [],
  categories: [],
  category: 'Todo',
  actions: {
    updateData: (newData) =>
      set(() => {
        localStorage.setItem('products', JSON.stringify(newData))
        return { data: newData }
      }),
    updateCategories: (newData) => set({ categories: newData }),
    updateCategory: (newData) => set({ category: newData })
  }
}))

/**
 *
 *
 * @returns {StoreDataTypes[]}
 */
export const useStoreSelected = () => useStore((state) => state.data)
/**
 *
 *
 * @returns {string[]}
 */
export const useCategoriesSelected = () => useStore((state) => state.categories)
/**
 *
 *
 * @returns {string}
 */
export const useCategorySelected = () => useStore((state) => state.category)
/**
 *
 *
 * @returns {{ updateData: (newData: StoreDataTypes[]) => void; updateCategories: (newData: string[]) => void; updateCategory: (newData: string) => void; }}
 */
export const useStoreActions = () => useStore((state) => state.actions)
