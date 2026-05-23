"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e3a5f] hover:bg-[#1e3a5f]/90 text-white text-sm font-medium transition-colors cursor-pointer"
    >
      <Printer size={16} aria-hidden="true" />
      Imprimir hoja
    </button>
  );
}
