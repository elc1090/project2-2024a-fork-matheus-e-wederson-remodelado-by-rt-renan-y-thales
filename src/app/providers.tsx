'use client'

import 'react-toastify/dist/ReactToastify.css'

import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import { CartProvider } from '@/context/cart-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <CartProvider>{children}</CartProvider>
      <ToastContainer />
    </>
  )
}
