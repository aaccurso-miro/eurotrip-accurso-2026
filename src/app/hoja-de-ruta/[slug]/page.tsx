import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getRoadSheetBySlug, roadSheets } from "@/data/roadSheets";
import PrintButton from "../PrintButton";
import RoadSheetArticle from "../RoadSheetArticle";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return roadSheets.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const sheet = getRoadSheetBySlug(slug);
  if (!sheet) return { title: "Hoja de Ruta · Eurotrip Accurso 2026" };
  return {
    title: `Día ${sheet.dayNumber}: ${sheet.from} → ${sheet.to} · Hoja de Ruta`,
  };
}

export default async function HojaDeRutaSlugPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const sheet = getRoadSheetBySlug(slug);
  if (!sheet) notFound();

  return (
    <main className="min-h-screen bg-[#faf5eb] dark:bg-[#0f172a] py-10 px-4 print:bg-white print:py-0">
      <div className="max-w-2xl mx-auto">
        <div className="print-hidden mb-6 flex items-center justify-between gap-3">
          <Link
            href="/hoja-de-ruta"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#93c5fd]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Todas las hojas
          </Link>
          <PrintButton />
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md print:shadow-none print:rounded-none p-8 sm:p-10 print:p-0">
          <RoadSheetArticle sheet={sheet} />
        </div>
      </div>
    </main>
  );
}
