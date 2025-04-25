
import { ReactNode } from "react";
export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border p-4 shadow bg-white">{children}</div>;
}
export function CardContent({ children, className }: { children: ReactNode, className?: string }) {
  return <div className={`space-y-2 ${className ?? ""}`}>{children}</div>;
}
