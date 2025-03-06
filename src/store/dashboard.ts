import { create } from 'zustand'
import { invoicesTypes } from '../types/types'

interface invoices {
  invoices: invoicesTypes[]
  view: string
  openLogin: boolean
  loginAnchor: null | HTMLElement
  typeForm: number
  actions: {
    updateInvoice: (newData: invoicesTypes[]) => void
  }
  actionsViews: {
    updateView: (newData: string) => void
  }
  actionsOpenLogin: {
    updateLoginAnchor: (newData: null | HTMLElement) => void
  }
  actionsTypeForm: {
    updateTypeForm: (newData: number) => void
  }
}

const useStore = create<invoices>((set) => ({
  invoices: [],
  view: 'Facturacion',
  openLogin: false,
  loginAnchor: null,
  typeForm: 0,
  actions: {
    updateInvoice: (newData: invoicesTypes[]) =>
      set(() => {
        localStorage.setItem('invoices', JSON.stringify(newData))
        return { invoices: newData }
      })
  },
  actionsViews: {
    updateView: (newData) => set({ view: newData })
  },
  actionsOpenLogin: {
    updateLoginAnchor: (newData) => {
      set({ loginAnchor: newData })
      set({ openLogin: Boolean(newData) })
    }
  },
  actionsTypeForm: {
    updateTypeForm: (newData) => set({ typeForm: newData })
  }
}))

export const useInvoiceSelected = () => useStore((state) => state.invoices)
export const useViewSelected = () => useStore((state) => state.view)
export const useOpenLogin = () => useStore((state) => state.openLogin)
export const useOpenAnchor = () => useStore((state) => state.loginAnchor)
export const useTypeForm = () => useStore((state) => state.typeForm)
export const useInvoiceActions = () => useStore((state) => state.actions)
export const useViewsActions = () => useStore((state) => state.actionsViews)
export const useActionsOpenLogin = () => useStore((state) => state.actionsOpenLogin)
export const useActionsTypeForm = () => useStore((state) => state.actionsTypeForm)
