import { create } from 'zustand'
import { StoreDataTypes } from '../types/types'

interface Store {
  data: StoreDataTypes[]
  categories: string[]
  category: string
  actions: {
    updateData: (newData: StoreDataTypes[]) => void
    updateCategories: (newData: string[]) => void
    updateCategory: (newData: string) => void
  }
}

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

export const useStoreSelected = () => useStore((state) => state.data)
export const useCategoriesSelected = () => useStore((state) => state.categories)
export const useCategorySelected = () => useStore((state) => state.category)
export const useStoreActions = () => useStore((state) => state.actions)
