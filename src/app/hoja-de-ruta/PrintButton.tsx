"use client";

import { useEffect } from "react";
import { Printer } from "lucide-react";

interface Props {
  label?: string;
}

export default function PrintButton({ label = "Imprimir hoja" }: Props = {}) {
  // When dark mode is active, the printed sheet would inherit dark backgrounds
  // (cards in #1e293b, washed-out text). Browsers fire `beforeprint` / `afterprint`
  // for both Cmd+P and window.print(), so we use them to swap to the light theme
  // for the print pass and restore it afterwards.
  useEffect(() => {
    const html = document.documentElement;
    let restored: string | null = null;

    const handleBeforePrint = () => {
      if (html.getAttribute("data-theme") === "dark") {
        restored = "dark";
        html.removeAttribute("data-theme");
      }
    };

    const handleAfterPrint = () => {
      if (restored === "dark") {
        html.setAttribute("data-theme", "dark");
      }
      restored = null;
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e3a5f] hover:bg-[#1e3a5f]/90 text-white text-sm font-medium transition-colors cursor-pointer"
    >
      <Printer size={16} aria-hidden="true" />
      {label}
    </button>
  );
}
