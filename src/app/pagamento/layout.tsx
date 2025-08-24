import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import type { ReactNode } from "react";

export default function ProdutoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Conteúdo da página de produto */}
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
