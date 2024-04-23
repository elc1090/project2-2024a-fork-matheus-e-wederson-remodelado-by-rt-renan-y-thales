'use client'

import { Barcode, CreditCard, QrCode } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { BillingTypeButton } from '@/components/billing-type-button'
import { CartTableRow } from '@/components/cart-table-cell'
import { Input } from '@/components/input'
import { useCart } from '@/context/cart-context'

interface CreditCard {
  name: string
  number: string
  month: string
  year: string
  cvc: string
}

interface FormData {
  name: string
  email: string
  cpf: string
  phone: string
  address: string
  addressNumber: string
  addressComplement: string
  postalCode: string
  city: string
  country: string
  billingType: 'PayPal' | 'credit card' | 'bank transfer' | undefined
  quantity: number
  creditCard?: CreditCard
}

export default function Checkout() {
  const router = useRouter()
  const { cart, cartAmount, resetCart } = useCart()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>()
  const { billingType } = watch()

  const [validation, setValidation] = useState<number | null>(null)

  async function handleFormSubmit({ billingType }: FormData) {
    const amount = 32.0
    const quantity = 2

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        payment_method: billingType,
        product_category: 'electronics',
        quantity,
        customer_local: 'Murphyberg',
      }),
    })
    const data = await response.json()

    if (data.error) {
      const err = data.error as string
      return alert(err)
    }

    setValidation(data.probability)
  }

  function handleFinishOrder() {
    resetCart()
    toast.success('Compra realizada com sucesso!')
    router.replace('/')
  }

  useEffect(() => {
    if (cart.length === 0) {
      router.replace('/')
    }
  }, [cart.length, router])

  return (
    <div className="flex max-w-screen-lg flex-col gap-5 py-10">
      <h1 className="text-xl font-bold">Finalizar Compra</h1>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex-col gap-10 md:grid md:grid-cols-2"
      >
        <main className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 rounded bg-zinc-800 p-4">
            <h2 className="text-lg font-semibold text-zinc-200">
              Dados Pessoais
            </h2>

            <div className="flex flex-col gap-2">
              <Input placeholder="Nome completo" {...register('name')} />
              <Input type="email" placeholder="Email" {...register('email')} />

              <div className="flex gap-2">
                <Input type="number" placeholder="CPF" {...register('cpf')} />
                <Input
                  type="tel"
                  placeholder="Telefone"
                  {...register('phone')}
                />
              </div>

              <div className="grid grid-cols-12 gap-2">
                <Input
                  placeholder="Endereço"
                  className="col-span-10"
                  {...register('address')}
                />
                <Input
                  type="number"
                  placeholder="Nº"
                  className="col-span-2"
                  {...register('addressNumber')}
                />
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Complemento"
                  {...register('addressComplement')}
                />
                <Input
                  type="number"
                  placeholder="CEP"
                  {...register('postalCode')}
                />
              </div>

              <div className="flex gap-2">
                <Input placeholder="Cidade" {...register('city')} />
                <Input placeholder="Estado" {...register('country')} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded bg-zinc-800 p-4">
            <h2 className="text-lg font-semibold text-zinc-200">
              Método de Pagamento
            </h2>

            <div className="flex justify-between gap-2">
              <BillingTypeButton
                onClick={() => setValue('billingType', 'credit card')}
                title="Cartão de Crédito"
                icon={CreditCard}
                isSelected={billingType === 'credit card'}
              />
              <BillingTypeButton
                onClick={() => setValue('billingType', 'bank transfer')}
                title="Boleto Bancário"
                icon={Barcode}
                isSelected={billingType === 'bank transfer'}
              />
              <BillingTypeButton
                onClick={() => setValue('billingType', 'PayPal')}
                title="Pix"
                icon={QrCode}
                isSelected={billingType === 'PayPal'}
              />
            </div>

            {billingType === 'credit card' && (
              <div className="mt-4 flex flex-col gap-2">
                <Input
                  placeholder="Nome impresso no cartão"
                  {...register('creditCard.name')}
                />
                <Input
                  placeholder="Número do cartão"
                  {...register('creditCard.number')}
                />

                <div className="flex gap-2">
                  <Input placeholder="Mês" {...register('creditCard.month')} />
                  <Input placeholder="Ano" {...register('creditCard.year')} />
                  <Input placeholder="CVV" {...register('creditCard.cvc')} />
                </div>
              </div>
            )}
          </div>
        </main>

        <aside>
          <table className="flex flex-col rounded bg-zinc-800 p-4">
            <h2 className="text-lg font-semibold text-zinc-200">
              Produtos no carrinho
            </h2>

            <thead className="mt-2 rounded-t bg-zinc-300/10 p-2 text-xs font-semibold">
              <tr className="grid grid-cols-8">
                <th className="col-span-3 flex justify-center">
                  Nome do Produto
                </th>
                <th className="col-span-2 flex justify-center">Valor</th>
                <th className="col-span-1 flex justify-center">Qtd.</th>
                <th className="col-span-2 flex justify-center">Subtotal</th>
              </tr>
            </thead>

            <tbody className="flex flex-col gap-1 border-x border-zinc-200/10 px-2 py-2 text-xs">
              {cart.map((product) => (
                <CartTableRow key={product.id} product={product} />
              ))}
            </tbody>

            <tfoot className="rounded-b bg-zinc-300/10 p-2 text-xs font-semibold">
              <tr className="flex justify-end gap-4 px-4">
                <td>Valor total</td>
                <td>
                  {cartAmount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
              </tr>
            </tfoot>

            {!validation && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-sm outline-none hover:bg-emerald-600/80 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:bg-emerald-600/40 disabled:hover:bg-emerald-600/40"
              >
                {isSubmitting ? 'Processando...' : 'Finalizar compra'}
              </button>
            )}

            {validation && validation < 45 && (
              <div className="mt-4 flex justify-center rounded border border-dashed border-emerald-600 bg-emerald-600/20 px-4 py-2">
                <span className="text-emerald-400">
                  Essa transação foi verificada e não possuí risco de fraude!
                </span>
              </div>
            )}

            {validation && validation >= 45 && validation < 55 && (
              <div className="mt-4 flex justify-center rounded border border-dashed border-yellow-600 bg-yellow-600/20 px-4 py-2">
                <span className="text-yellow-400">
                  Essa transação possui risco de fraude!
                </span>
              </div>
            )}

            {validation && validation >= 55 && (
              <div className="mt-4 flex justify-center rounded border border-dashed border-rose-600 bg-rose-600/20 px-4 py-2">
                <span className="text-rose-400">
                  Essa transação foi detectada como fraude!
                </span>
              </div>
            )}

            {validation && (
              <button
                type="button"
                onClick={handleFinishOrder}
                className="mt-4 rounded-md bg-amber-600 px-4 py-2 text-sm outline-none hover:bg-amber-600/80 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              >
                {validation >= 45 ? 'Finalizar compra assim mesmo' : 'Concluir'}
              </button>
            )}
          </table>
        </aside>
      </form>
    </div>
  )
}
