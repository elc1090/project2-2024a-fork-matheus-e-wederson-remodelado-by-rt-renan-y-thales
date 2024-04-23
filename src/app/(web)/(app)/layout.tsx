import { CartResume } from '@/components/cart-resume'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <div className="w-full max-w-screen-lg flex-1">{children}</div>
      <CartResume />
    </div>
  )
}
