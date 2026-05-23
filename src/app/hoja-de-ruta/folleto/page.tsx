import Link from "next/link";
import { ArrowLeft, Info } from "lucide-react";
import { roadSheets } from "@/data/roadSheets";
import PrintButton from "../PrintButton";
import RoadSheetArticle from "../RoadSheetArticle";
import CoverPage from "./CoverPage";
import TripSummaryPage from "./TripSummaryPage";
import HotelsPage from "./HotelsPage";
import PracticalInfoPage from "./PracticalInfoPage";
import ContactsPage from "./ContactsPage";
import BackCoverPage from "./BackCoverPage";

export const metadata = {
  title: "Folleto imprimible · Eurotrip Accurso 2026",
};

export default function FolletoPage() {
  return (
    <main className="min-h-screen bg-[#faf5eb] dark:bg-[#0f172a] print:bg-white py-10 print:py-0">
      {/* On-screen-only top bar */}
      <div className="print-hidden max-w-3xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <Link
            href="/hoja-de-ruta"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#93c5fd]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver a las hojas
          </Link>
          <PrintButton label="Imprimir folleto" />
        </div>

        <div className="rounded-xl bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-gray-700 p-4 flex items-start gap-3">
          <Info size={18} className="text-[#d4a843] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
            <p className="font-medium mb-1">Cómo imprimir como folleto (12 páginas)</p>
            <ol className="text-xs text-gray-600 dark:text-gray-300 space-y-0.5 list-decimal list-inside">
              <li>Hacé clic en <strong>Imprimir folleto</strong> (o Cmd+P) y elegí <strong>Guardar como PDF</strong>.</li>
              <li>Abrí el PDF en Vista Previa o Adobe Reader.</li>
              <li>Imprimilo con la opción <strong>Folleto / Booklet</strong> — la impresora acomoda las páginas para que se pliegue como librito A5.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* The 12 booklet pages */}
      <div className="print:m-0">
        <div className="print-page break-after-page last:break-after-auto bg-white dark:bg-[#1e293b] w-[21cm] min-h-[29.7cm] p-[1.5cm] mx-auto my-4 shadow-md box-border print:w-auto print:min-h-0 print:p-0 print:m-0 print:shadow-none print:bg-white">
          <CoverPage />
        </div>

        <div className="print-page break-after-page last:break-after-auto bg-white dark:bg-[#1e293b] w-[21cm] min-h-[29.7cm] p-[1.5cm] mx-auto my-4 shadow-md box-border print:w-auto print:min-h-0 print:p-0 print:m-0 print:shadow-none print:bg-white">
          <TripSummaryPage />
        </div>

        <div className="print-page break-after-page last:break-after-auto bg-white dark:bg-[#1e293b] w-[21cm] min-h-[29.7cm] p-[1.5cm] mx-auto my-4 shadow-md box-border print:w-auto print:min-h-0 print:p-0 print:m-0 print:shadow-none print:bg-white">
          <HotelsPage />
        </div>

        <div className="print-page break-after-page last:break-after-auto bg-white dark:bg-[#1e293b] w-[21cm] min-h-[29.7cm] p-[1.5cm] mx-auto my-4 shadow-md box-border print:w-auto print:min-h-0 print:p-0 print:m-0 print:shadow-none print:bg-white">
          <PracticalInfoPage />
        </div>

        {roadSheets.map((sheet) => (
          <div key={sheet.slug} className="print-page break-after-page last:break-after-auto bg-white dark:bg-[#1e293b] w-[21cm] min-h-[29.7cm] p-[1.5cm] mx-auto my-4 shadow-md box-border print:w-auto print:min-h-0 print:p-0 print:m-0 print:shadow-none print:bg-white">
            <RoadSheetArticle sheet={sheet} />
          </div>
        ))}

        <div className="print-page break-after-page last:break-after-auto bg-white dark:bg-[#1e293b] w-[21cm] min-h-[29.7cm] p-[1.5cm] mx-auto my-4 shadow-md box-border print:w-auto print:min-h-0 print:p-0 print:m-0 print:shadow-none print:bg-white">
          <ContactsPage />
        </div>

        <div className="print-page break-after-page last:break-after-auto bg-white dark:bg-[#1e293b] w-[21cm] min-h-[29.7cm] p-[1.5cm] mx-auto my-4 shadow-md box-border print:w-auto print:min-h-0 print:p-0 print:m-0 print:shadow-none print:bg-white">
          <BackCoverPage />
        </div>
      </div>
    </main>
  );
}
