
import { ReactNode } from "react";
export function Tabs({ children, defaultValue }: { children: ReactNode, defaultValue: string }) {
  return <div>{children}</div>;
}
export function TabsList({ children, className }: { children: ReactNode, className?: string }) {
  return <div className={`flex gap-2 ${className ?? ""}`}>{children}</div>;
}
export function TabsTrigger({ value, children, onClick }: { value: string, children: ReactNode, onClick?: () => void }) {
  return <button onClick={onClick} className="px-3 py-2 border rounded">{children}</button>;
}
export function TabsContent({ value, children }: { value: string, children: ReactNode }) {
  return <div className="mt-4">{children}</div>;
}
