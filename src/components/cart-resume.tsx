'use client'

import { useRouter } from 'next/navigation'

import { useCart } from '@/context/cart-context'

export function CartResume() {
  const router = useRouter()
  const { quantityInCart, cartAmount } = useCart()

  function handleGoToCheckout() {
    router.push('/checkout')
  }

  return (
    <>
      {!!quantityInCart && (
        <div className="flex w-full items-center justify-end gap-4 bg-zinc-600 px-4 py-4">
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground text-sm">
              {quantityInCart} produto
              {quantityInCart === 1 ? '' : 's'}
            </span>

            <div className="mx-1 h-4 w-px bg-zinc-400" />

            <strong className="text-sm font-semibold">
              {cartAmount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </strong>
          </div>

          <button
            type="button"
            onClick={handleGoToCheckout}
            className="rounded bg-emerald-500 px-2 py-2 text-sm hover:bg-emerald-500/80"
          >
            Finalizar compra
          </button>
        </div>
      )}
    </>
  )
}
