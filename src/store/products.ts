import { create } from 'zustand'
import { StoreDataTypes } from '../types/types'

interface Store {
  bears: number
  data: StoreDataTypes[]
  // data: any
  actions: {
    increasePopulation: () => void
    removeAllBears: () => void
    updateBears: (newBears: number) => void
    updateData: (newData: StoreDataTypes[]) => void
  }
}

const useStore = create<Store>((set) => ({
  bears: 0,
  data: [],
  actions: {
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
    updateData: (newData) =>
      set(() => {
        localStorage.setItem('products', JSON.stringify(newData))
        return { data: newData }
      })
  }
}))

export const useBearsSelected = () => useStore((state) => state.bears)
export const useStoreSelected = () => useStore((state) => state.data)
export const useStoreActions = () => useStore((state) => state.actions)
