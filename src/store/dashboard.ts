import { create } from 'zustand'
import { invoicesTypes } from '../types/types'

interface invoices {
  invoices: invoicesTypes[]
  view: string
  actions: {
    updateInvoice: (newData: invoicesTypes[]) => void
  }
  actionsViews: {
    updateView: (newData: string) => void
  }
}

const useStore = create<invoices>((set) => ({
  invoices: [],
  view: 'Facturacion',
  actions: {
    updateInvoice: (newData: invoicesTypes[]) =>
      set(() => {
        localStorage.setItem('invoices', JSON.stringify(newData))
        return { invoices: newData }
      })
  },
  actionsViews: {
    updateView: (newData) => set({ view: newData })
  }
}))

export const useInvoiceSelected = () => useStore((state) => state.invoices)
export const useViewSelected = () => useStore((state) => state.view)
export const useInvoiceActions = () => useStore((state) => state.actions)
export const useViewsActions = () => useStore((state) => state.actionsViews)
