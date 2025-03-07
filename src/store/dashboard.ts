import { create } from 'zustand'
import { invoicesTypes } from '../types/types'

/**
 *
 *
 * @interface invoices
 * @typedef {invoices}
 */
interface invoices {
  /**
   *
   *
   * @type {invoicesTypes[]}
   */
  invoices: invoicesTypes[]
  /**
   *
   *
   * @type {string}
   */
  view: string
  /**
   *
   *
   * @type {boolean}
   */
  openLogin: boolean
  /**
   *
   *
   * @type {(null | HTMLElement)}
   */
  loginAnchor: null | HTMLElement
  /**
   *
   *
   * @type {number}
   */
  typeForm: number
  /**
   *
   *
   * @type {{
   *     updateInvoice: (newData: invoicesTypes[]) => void
   *   }}
   */
  actions: {
    updateInvoice: (newData: invoicesTypes[]) => void
  }
  /**
   *
   *
   * @type {{
   *     updateView: (newData: string) => void
   *   }}
   */
  actionsViews: {
    updateView: (newData: string) => void
  }
  /**
   *
   *
   * @type {{
   *     updateLoginAnchor: (newData: null | HTMLElement) => void
   *   }}
   */
  actionsOpenLogin: {
    updateLoginAnchor: (newData: null | HTMLElement) => void
  }
  /**
   *
   *
   * @type {{
   *     updateTypeForm: (newData: number) => void
   *   }}
   */
  actionsTypeForm: {
    updateTypeForm: (newData: number) => void
  }
}

/**
 *
 *
 * @type {UseBoundStore<StoreApi<invoices>>}
 */
const useStore = create<invoices>((set) => ({
  invoices: [],
  view: '',
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

/**
 *
 *
 * @returns {invoicesTypes[]}
 */
export const useInvoiceSelected = () => useStore((state) => state.invoices)
/**
 *
 *
 * @returns {string}
 */
export const useViewSelected = () => useStore((state) => state.view)
/**
 *
 *
 * @returns {boolean}
 */
export const useOpenLogin = () => useStore((state) => state.openLogin)
/**
 *
 *
 * @returns {HTMLElement}
 */
export const useOpenAnchor = () => useStore((state) => state.loginAnchor)
/**
 *
 *
 * @returns {number}
 */
export const useTypeForm = () => useStore((state) => state.typeForm)
/**
 *
 *
 * @returns {{ updateInvoice: (newData: invoicesTypes[]) => void; }}
 */
export const useInvoiceActions = () => useStore((state) => state.actions)
/**
 *
 *
 * @returns {{ updateView: (newData: string) => void; }}
 */
export const useViewsActions = () => useStore((state) => state.actionsViews)
/**
 *
 *
 * @returns {{ updateLoginAnchor: (newData: HTMLElement) => void; }}
 */
export const useActionsOpenLogin = () => useStore((state) => state.actionsOpenLogin)
/**
 *
 *
 * @returns {{ updateTypeForm: (newData: number) => void; }}
 */
export const useActionsTypeForm = () => useStore((state) => state.actionsTypeForm)
