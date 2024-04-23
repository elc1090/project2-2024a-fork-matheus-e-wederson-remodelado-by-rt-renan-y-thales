import { CartResume } from '@/components/cart-resume'
import { ProductCard } from '@/components/product-card'

interface Product {
  id: string
  name: string
  image: string
  price: number
}

async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    {
      next: {
        revalidate: 60 * 60 * 24, // 1 day
      },
    },
  )
  const data = await response.json()

  if (data.error) {
    return []
  }

  return data.products
}

export default async function Home() {
  const products = await fetchProducts()

  return (
    <div className="flex w-full max-w-screen-lg flex-1 flex-col gap-5 px-4 py-10">
      <h1 className="text-xl font-bold">Produtos</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
