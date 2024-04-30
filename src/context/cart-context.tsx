'use client'

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

interface Product {
  id: string
  title: string
  price: number
}

interface Cart extends Product {
  quantity: number
}

type CartContextData = {
  cart: Cart[]
  quantityInCart: number
  cartAmount: number
  addCartItem: (product: Product) => void
  removeCartItem: (productId: string) => void
  quantityCartItem: (productId: string) => number
  amountCarItem: (productId: string) => number
  resetCart: () => void
}

interface CartProviderProps {
  children: ReactNode
}

const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<Cart[]>([])

  function addCartItem(product: Product) {
    const productExists = cartItems.findIndex((item) => item.id === product.id)

    if (productExists < 0) {
      setCartItems((state) => [...state, { ...product, quantity: 1 }])
    } else {
      const updatedProduct = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )

      setCartItems(updatedProduct)
    }
  }

  function removeCartItem(productId: string) {
    const products = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity - 1 }
      }

      return item
    })

    const filteredProducts = products.filter((item) => item.quantity > 0)

    setCartItems(filteredProducts)
  }

  const quantityInCart = useMemo(() => {
    return cartItems.reduce((acc, value) => {
      return acc + value.quantity
    }, 0)
  }, [cartItems])

  const cartAmount = useMemo(() => {
    return cartItems.reduce((acc, value) => {
      return acc + value.price * value.quantity
    }, 0)
  }, [cartItems])

  const quantityCartItem = useCallback(
    (productId: string) => {
      const quantity =
        cartItems.find((product) => product.id === productId)?.quantity ?? 0

      return quantity
    },
    [cartItems],
  )

  const amountCarItem = useCallback(
    (productId: string) => {
      return cartItems.reduce((acc, value) => {
        if (value.id === productId) {
          return acc + value.price * value.quantity
        }

        return acc
      }, 0)
    },
    [cartItems],
  )

  function resetCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cart: cartItems,
        quantityInCart,
        cartAmount,
        addCartItem,
        removeCartItem,
        quantityCartItem,
        amountCarItem,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
