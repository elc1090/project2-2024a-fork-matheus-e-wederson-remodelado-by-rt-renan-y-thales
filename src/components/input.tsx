import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'

interface InputProps extends ComponentProps<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <input
      ref={ref}
      className={clsx(
        'w-full rounded border border-zinc-800 bg-zinc-700 p-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-900',
        className,
      )}
      {...rest}
    />
  );
});
