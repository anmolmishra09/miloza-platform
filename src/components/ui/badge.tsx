import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
const variants = cva('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors', {
  variants: { variant: { default: 'border-transparent bg-[#0F0F01] text-white', secondary: 'border-transparent bg-[#EAE9E1] text-[#0F0F01]', destructive: 'border-transparent bg-red-500 text-white', outline: 'text-foreground' } },
  defaultVariants: { variant: 'default' },
});
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof variants> {}
export function Badge({ className, variant, ...props }: BadgeProps) { return <div className={cn(variants({ variant }), className)} {...props} />; }
