/**
 *
 *
 * @export
 * @interface UserDataTypes
 * @typedef {UserDataTypes}
 */
export interface UserDataTypes {
  /**
   *
   *
   * @type {string}
   */
  first_name: string
  /**
   *
   *
   * @type {string}
   */
  last_name: string
  /**
   *
   *
   * @type {string}
   */
  email: string
  /**
   *
   *
   * @type {string}
   */
  phone: string
  /**
   *
   *
   * @type {(string | null)}
   */
  country: string | null
  /**
   *
   *
   * @type {string}
   */
  address: string
  /**
   *
   *
   * @type {?string}
   */
  password?: string
  /**
   *
   *
   * @type {?(string | string[])}
   */
  role?: string | string[]
  /**
   *
   *
   * @type {?string}
   */
  confirm_password?: string
}
/**
 *
 *
 * @export
 * @interface StoreDataTypes
 * @typedef {StoreDataTypes}
 */
export interface StoreDataTypes {
  /**
   *
   *
   * @type {number}
   */
  id: number
  /**
   *
   *
   * @type {string}
   */
  name: string
  /**
   *
   *
   * @type {string}
   */
  category: string
  /**
   *
   *
   * @type {number}
   */
  stock: number
  /**
   *
   *
   * @type {number}
   */
  price: number
  /**
   *
   *
   * @type {number}
   */
  tax: number
  /**
   *
   *
   * @type {?number}
   */
  quantity?: number
}

/**
 *
 *
 * @export
 * @interface invoicesTypes
 * @typedef {invoicesTypes}
 */
export interface invoicesTypes {
  /**
   *
   *
   * @type {number}
   */
  id: number
  /**
   *
   *
   * @type {string}
   */
  date: string
  /**
   *
   *
   * @type {StoreDataTypes[]}
   */
  items: StoreDataTypes[]
  /**
   *
   *
   * @type {UserDataTypes}
   */
  shippingInfo: UserDataTypes
  /**
   *
   *
   * @type {number}
   */
  subtotal: number
  /**
   *
   *
   * @type {number}
   */
  tax: number
  /**
   *
   *
   * @type {number}
   */
  total: number
}

/**
 *
 *
 * @export
 * @interface dialogItemTypes
 * @typedef {dialogItemTypes}
 */
export interface dialogItemTypes {
  /**
   *
   *
   * @type {boolean}
   */
  open: boolean
  /**
   *
   *
   * @type {(invoicesTypes | undefined)}
   */
  data: invoicesTypes | undefined
}
