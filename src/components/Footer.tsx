import { Heart } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + message */}
          <div>
            <h3 className="text-xl font-[family-name:var(--font-playfair)] mb-3">
              Eurotrip Accurso 2026
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Un road trip por el corazón de Europa.
              <br />
              11 días, 7 ciudades, 4 países, ~2640 km.
              <br />
              25 mayo — 4 junio 2026.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-medium text-white/80 mb-3 text-sm">
              Secciones
            </h4>
            <div className="grid grid-cols-2 gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/50 hover:text-[#e8c96a] text-sm py-1 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Food bingo */}
          <div>
            <h4 className="font-medium text-white/80 mb-3 text-sm">
              Bingo gastronómico 🎯
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Bratwurst",
                "Käsespätzle",
                "Schneeballen",
                "Schnitzel",
                "Goulash",
                "Strudel",
                "Sachertorte",
                "Svíčková",
                "Knedlíky",
                "Pilsner",
              ].map((food) => (
                <span
                  key={food}
                  className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/60"
                >
                  {food}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm flex items-center justify-center gap-1.5">
            Hecho con{" "}
            <Heart size={14} className="text-red-400 fill-red-400" /> para la
            familia Accurso 🇦🇷❤️🇳🇱
          </p>
        </div>
      </div>
    </footer>
  );
}
