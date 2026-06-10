import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { currentSource, currentCoin } from "@/store";
import { certificates } from "@/config";
import type { Locale } from "@/types";
import { cn } from "@/lib/cn";
import {
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface Props {
  locale: Locale;
}

const PER_PAGE = 3;

const tabs = [
  {
    id: "threejs" as const,
    label: { es: "Three.js Journey", en: "Three.js Journey" },
  },
  { id: "devtalles" as const, label: { es: "DevTalles", en: "DevTalles" } },
];

export default function CertificateList({ locale }: Props) {
  const $source = useStore(currentSource);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [$source]);

  const filtered = certificates.filter((c) => c.source === $source);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const pageItems = filtered.slice(start, start + PER_PAGE);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-12 pt-4">
      <div className="flex gap-2 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              currentSource.set(tab.id);
              currentCoin.set(tab.id === "threejs" ? "coin-2" : "coin-1");
            }}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
              $source === tab.id
                ? "bg-sea-nymph-50 text-sea-nymph-600 hover:bg-sea-nymph-100"
                : "bg-sea-nymph-500 text-white opacity-60 hover:opacity-100 hover:bg-sea-nymph-100 hover:text-sea-nymph-600",
            )}
          >
            {tab.label[locale]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 min-h-84">
        {pageItems.map((cert) => (
          <a
            key={cert.url}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/70 backdrop-blur-sm border border-sea-nymph-200 hover:border-sea-nymph-400 hover:-translate-y-0.5 transition-all duration-300"
          >
            <img
              src={cert.logo}
              alt=""
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain shrink-0"
              loading="lazy"
            />
            <span className="text-sea-nymph-800 text-sm sm:text-base font-medium group-hover:text-sea-nymph-600 transition-colors flex-1">
              {locale === "es" ? cert.title : cert.titleEn}
            </span>
            <div className="w-8 h-8 rounded-full bg-sea-nymph-100 flex items-center justify-center shrink-0 group-hover:bg-sea-nymph-500 group-hover:text-white transition-all duration-300">
              <FaExternalLinkAlt />
            </div>
          </a>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={safePage <= 1}
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300",
            safePage <= 1
              ? "text-sea-nymph-400 cursor-not-allowed"
              : "bg-sea-nymph-500 text-white hover:bg-sea-nymph-600",
          )}
        >
          <FaChevronLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={cn(
              "w-9 h-9 rounded-full text-sm font-medium transition-all duration-300",
              p === safePage
                ? "bg-sea-nymph-500 text-white "
                : "bg-sea-nymph-100 text-sea-nymph-600 hover:bg-sea-nymph-200",
            )}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={safePage >= totalPages}
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300",
            safePage >= totalPages
              ? "text-sea-nymph-400 cursor-not-allowed"
              : "bg-sea-nymph-500 text-white hover:bg-sea-nymph-600",
          )}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
