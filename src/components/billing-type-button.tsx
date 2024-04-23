// 'use client'

import clsx from 'clsx'
import { LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'

interface BillingTypeButtonProps extends ComponentProps<'button'> {
  icon: LucideIcon
  title: string
  isSelected?: boolean
}

export function BillingTypeButton({
  icon: Icon,
  title,
  isSelected = false,
  ...props
}: BillingTypeButtonProps) {
  console.log(isSelected)
  return (
    <button
      type="button"
      className={clsx(
        'flex h-24 w-full flex-col items-center justify-center gap-2 rounded border-2 outline-none hover:bg-zinc-700/50 focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900',
        isSelected ? 'border-zinc-300' : 'border-zinc-700 ',
      )}
      {...props}
    >
      <Icon className="size-7" />
      <span className="h-6 text-xs">{title}</span>
    </button>
  )
}
