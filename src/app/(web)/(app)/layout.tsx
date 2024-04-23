import { CartResume } from '@/components/cart-resume'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex w-full flex-col items-center">
      <div>{children}</div>
      <CartResume />
    </div>
  )
}
