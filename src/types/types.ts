export interface UserDataTypes {
  first_name: string
  last_name: string
  email: string
  phone: string
  country: string | null
  address: string
  password?: string
  role?: string | string[]
  confirm_password?: string
}
export interface StoreDataTypes {
  id: number
  name: string
  category: string
  stock: number
  price: number
  tax: number
  quantity?: number
}

export interface invoicesTypes {
  id: number
  date: string
  items: StoreDataTypes[]
  shippingInfo: UserDataTypes
  subtotal: number
  tax: number
  total: number
}

export interface dialogItemTypes {
  open: boolean
  data: invoicesTypes | undefined
}
