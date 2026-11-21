import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';
export function Toaster(props: ToasterProps) { return <SonnerToaster theme="light" className="toaster group" toastOptions={{ classNames: { toast: 'rounded-xl border border-[#ADA28C]/30', title: 'font-semibold' } }} {...props} />; }
