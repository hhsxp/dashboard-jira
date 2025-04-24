
import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl shadow-md border p-4 bg-white">{children}</div>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="space-y-2">{children}</div>;
}
