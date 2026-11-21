import * as React from 'react';
import { cn } from '@/lib/utils';
export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, type, ...props }, ref) => <input ref={ref} type={type} className={cn('flex h-11 w-full rounded-xl border border-[#ADA28C]/40 bg-white px-3 py-2 text-sm text-[#0F0F01] shadow-sm outline-none placeholder:text-[#0F0F01]/40 focus-visible:ring-2 focus-visible:ring-[#7C9D8C] disabled:cursor-not-allowed disabled:opacity-50', className)} {...props} />);
Input.displayName = 'Input';
