'use client'
import Image from 'next/image'

import { useCart } from '@/context/cart-context'

interface Product {
  id: string
  title: string
  image: string
  price: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addCartItem } = useCart()

  function handleAddProduct() {
    addCartItem(product)
  }

  return (
    <div className="flex flex-col gap-2 rounded bg-zinc-800 p-4">
      <Image
        src={product.image}
        alt=""
        height={160}
        width={200}
        quality={100}
        className="h-40 w-full rounded object-cover"
      />

      <div className="flex flex-col">
        <span className="font-medium">{product.title}</span>
        <span className="text-sm text-zinc-400">
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>

      <button
        type="button"
        onClick={handleAddProduct}
        className="rounded bg-emerald-600 px-4 py-2 text-xs hover:bg-emerald-600/80"
      >
        Adicionar no carrinho
      </button>
    </div>
  )
}
