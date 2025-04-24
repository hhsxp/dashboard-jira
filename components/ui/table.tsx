
import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return <table className="table-auto w-full border-collapse border">{children}</table>;
}

export function TableHeader({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableRow({ children, className }: { children: ReactNode; className?: string }) {
  return <tr className={className}>{children}</tr>;
}

export function TableCell({ children }: { children: ReactNode }) {
  return <td className="border px-4 py-2">{children}</td>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}
