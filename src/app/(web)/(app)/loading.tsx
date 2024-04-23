import { ProductCartSkeleton } from '@/components/product-cart-skeleton'

export default async function AppLoading() {
  return (
    <div className="flex w-full max-w-screen-lg flex-1 flex-col gap-5 px-4 py-10">
      <h1 className="text-xl font-bold">Produtos</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <ProductCartSkeleton key={idx} />
        ))}
      </div>
    </div>
  )
}
