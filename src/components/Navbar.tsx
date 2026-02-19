"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.getAttribute("data-theme") === "dark";
  });
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    window.history.pushState(null, "", href);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className={`font-[family-name:var(--font-playfair)] text-xl font-bold transition-colors ${
              scrolled ? "text-[#1e3a5f] dark:text-[#93c5fd]" : "text-white"
            }`}
          >
            Eurotrip Accurso 🚗
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-gray-700 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#93c5fd] hover:bg-[#1e3a5f]/5 dark:hover:bg-white/10"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </a>
            ))}
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-gray-600 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#93c5fd] hover:bg-[#1e3a5f]/5 dark:hover:bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={handleLogout}
              className={`ml-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                scrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
              title="Cerrar sesión"
            >
              <LogOut size={16} />
              <span>Salir</span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? "text-[#1e3a5f] dark:text-gray-200" : "text-white"
            }`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#93c5fd] hover:bg-[#1e3a5f]/5 dark:hover:bg-white/10 text-sm font-medium"
                >
                  {item.label}
                </a>
              ))}
              {/* Theme toggle in mobile */}
              <button
                onClick={toggleTheme}
                className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#1e3a5f] dark:hover:text-[#93c5fd] hover:bg-[#1e3a5f]/5 dark:hover:bg-white/10 text-sm font-medium flex items-center gap-2"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                <span>{isDark ? "Modo claro" : "Modo oscuro"}</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium flex items-center gap-2"
              >
                <LogOut size={16} />
                <span>Salir</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
