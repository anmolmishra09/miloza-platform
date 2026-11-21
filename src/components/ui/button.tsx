import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva('inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C9D8C] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0', {
  variants: {
    variant: {
      default: 'bg-[#0F0F01] text-white hover:bg-[#29291f]',
      destructive: 'bg-red-500 text-white hover:bg-red-600',
      outline: 'border border-input bg-transparent hover:bg-[#F0F0E9]',
      secondary: 'bg-[#EAE9E1] text-[#0F0F01] hover:bg-[#deddd4]',
      ghost: 'hover:bg-[#F0F0E9]',
      link: 'text-[#526f5f] underline-offset-4 hover:underline',
    },
    size: { default: 'h-10 px-4 py-2', sm: 'h-9 px-3', lg: 'h-11 px-8', icon: 'h-10 w-10' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), 'rounded-xl', className)} {...props} />;
});
Button.displayName = 'Button';
