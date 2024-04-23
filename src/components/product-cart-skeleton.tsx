export function ProductCartSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded bg-zinc-800 p-4">
      <div className="h-40 w-full animate-pulse rounded bg-zinc-600" />

      <div className="flex flex-col gap-2">
        <div className="h-5 w-40 animate-pulse bg-zinc-600" />
        <div className="h-4 w-20 animate-pulse bg-zinc-600" />
      </div>

      <div className="h-7 animate-pulse rounded bg-zinc-600" />
    </div>
  )
}
