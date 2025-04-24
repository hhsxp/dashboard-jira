
import { ReactNode } from "react";

export function Tabs({ children, defaultValue, className }: { children: ReactNode, defaultValue: string, className?: string }) {
  return <div className={className}>{children}</div>;
}

export function TabsList({ children, className }: { children: ReactNode, className?: string }) {
  return <div className={`flex ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children }: { value: string, children: ReactNode }) {
  return <button className="px-4 py-2 border rounded hover:bg-gray-100">{children}</button>;
}

export function TabsContent({ value, children }: { value: string, children: ReactNode }) {
  return <div className="mt-4">{children}</div>;
}
