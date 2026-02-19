"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  CheckSquare,
  Square,
  FileText,
  Shirt,
  Smartphone,
  HeartPulse,
  Car,
  RotateCcw,
  Luggage,
} from "lucide-react";
import { packingList, type PackingCategory } from "@/data/packing";

const categoryIcons: Record<string, React.ReactNode> = {
  "file-text": <FileText size={18} />,
  shirt: <Shirt size={18} />,
  smartphone: <Smartphone size={18} />,
  "heart-pulse": <HeartPulse size={18} />,
  car: <Car size={18} />,
};

const LS_KEY = "eurotrip-packing-checks";

function loadChecked(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveChecked(data: Record<string, boolean>) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export default function PackingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid sync setState in effect body (React 19 compiler)
    const init = setTimeout(() => {
      setChecked(loadChecked());
      setMounted(true);
    }, 0);
    return () => clearTimeout(init);
  }, []);

  const toggle = useCallback(
    (key: string) => {
      const next = { ...checked, [key]: !checked[key] };
      setChecked(next);
      saveChecked(next);
    },
    [checked]
  );

  const reset = useCallback(() => {
    setChecked({});
    saveChecked({});
  }, []);

  const totalItems = packingList.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  if (!mounted) {
    return (
      <section id="equipaje" className="py-20 bg-[#faf5eb] dark:bg-[#0f172a]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="h-64" />
        </div>
      </section>
    );
  }

  return (
    <section id="equipaje" className="py-20 bg-[#faf5eb] dark:bg-[#0f172a]">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Luggage className="text-[#d4a843]" size={28} />
            <h2 className="text-3xl sm:text-4xl font-[family-name:var(--font-playfair)] text-[#1e3a5f] dark:text-[#93c5fd]">
              Checklist de Equipaje
            </h2>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Lista interactiva que se guarda automáticamente. Marcá lo que ya
            tengan preparado.
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              {checkedCount} de {totalItems} items
            </span>
            <span className="text-[#1e3a5f] dark:text-[#93c5fd] font-bold">{progress}%</span>
          </div>
          <div className="h-3 bg-white dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  progress === 100
                    ? "linear-gradient(90deg, #22c55e, #16a34a)"
                    : "linear-gradient(90deg, #d4a843, #e8c96a)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          {progress === 100 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 dark:text-green-400 text-sm text-center mt-2 font-medium"
            >
              ✅ ¡Todo listo para el viaje!
            </motion.p>
          )}
        </motion.div>

        {/* Categories */}
        <div className="space-y-4">
          {packingList.map((category, catIndex) => (
            <CategoryBlock
              key={category.name}
              category={category}
              catIndex={catIndex}
              checked={checked}
              onToggle={toggle}
            />
          ))}
        </div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors px-4 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-800"
          >
            <RotateCcw size={14} />
            Resetear checklist
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryBlock({
  category,
  catIndex,
  checked,
  onToggle,
}: {
  category: PackingCategory;
  catIndex: number;
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  const checkedInCat = category.items.filter(
    (_, i) => checked[`${catIndex}-${i}`]
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: catIndex * 0.08 }}
      className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-[#d4a843]">
            {categoryIcons[category.icon] || <FileText size={18} />}
          </span>
          <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm">{category.name}</h3>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {checkedInCat}/{category.items.length}
        </span>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-700">
        {category.items.map((item, itemIndex) => {
          const key = `${catIndex}-${itemIndex}`;
          const isChecked = !!checked[key];
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className="w-full flex items-center gap-3 px-5 py-3 text-sm hover:bg-[#faf5eb]/50 dark:hover:bg-gray-700/50 transition-colors text-left cursor-pointer"
            >
              {isChecked ? (
                <CheckSquare
                  size={18}
                  className="text-green-500 shrink-0"
                />
              ) : (
                <Square size={18} className="text-gray-300 dark:text-gray-600 shrink-0" />
              )}
              <span
                className={
                  isChecked
                    ? "text-gray-400 line-through"
                    : "text-gray-700 dark:text-gray-200"
                }
              >
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
