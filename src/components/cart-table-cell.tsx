'use client'

import { ComponentProps } from 'react'

import { useCart } from '@/context/cart-context'
interface Product {
  id: string
  title: string
  price: number
  quantity: number
}

interface CartTableRowProps extends ComponentProps<'tr'> {
  product: Product
}

export function CartTableRow({ product, ...props }: CartTableRowProps) {
  const { quantityCartItem, addCartItem, removeCartItem, amountCarItem } =
    useCart()

  const quantityInCart = quantityCartItem(product.id)

  const amountItem = amountCarItem(product.id)

  function handleAdd() {
    addCartItem(product)
  }

  function handleRemove() {
    removeCartItem(product.id)
  }

  return (
    <tr
      className="grid grid-cols-8 border-b border-zinc-300/10 py-2 last:border-0"
      {...props}
    >
      <td className="col-span-3 flex">
        <span>{product.title}</span>
      </td>
      <td className="col-span-2 flex justify-center">
        {product.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </td>
      <td className="col-span-1 flex justify-center gap-2">
        <button
          type="button"
          onClick={handleRemove}
          disabled={quantityInCart <= 0}
          className="flex w-4 items-center justify-center rounded-sm bg-zinc-400/10 font-medium outline-none hover:bg-zinc-400/20 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900 disabled:opacity-50 disabled:hover:bg-zinc-400/10"
        >
          -
        </button>
        <span className="w-4 select-none text-center font-mono font-medium">
          {quantityInCart}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          className="flex w-4 items-center justify-center rounded-sm bg-zinc-400/10 font-medium outline-none hover:bg-zinc-400/20 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-900 disabled:opacity-50 disabled:hover:bg-zinc-400/10"
        >
          +
        </button>
      </td>
      <td className="col-span-2 flex justify-center">
        {amountItem.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </td>
    </tr>
  )
}
