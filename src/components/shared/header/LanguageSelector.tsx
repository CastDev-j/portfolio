import { cn } from "@/lib/cn";
import type { Locale } from "@/types";
import { useState } from "react";
import { IoLanguageSharp } from "react-icons/io5";

interface Props {
  locale: Locale;
}

const LanguageSelector = ({ locale }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-1.5 outline-sea-nymph-300 outline-2 outline-offset-2 rounded-lg transition-colors focus:outline-sea-nymph-500",
          isOpen && "outline-sea-nymph-500 bg-sea-nymph-500 text-white",
        )}
      >
        <IoLanguageSharp />
      </button>
      <li
        className={cn(
          "flex flex-col gap-2 absolute top-12 left-1/2 -translate-x-1/2 transition-all bg-sea-nymph-500 text-sea-nymph-50 rounded-lg p-2 pointer-events-none",
          isOpen && "opacity-100 translate-y-0 pointer-events-auto",
          !isOpen && "opacity-0 translate-y-2 pointer-events-none",
        )}
      >
        <span className="rotate-45 size-6 bg-sea-nymph-500 absolute -top-2 left-1/2 -translate-x-1/2 z-0" />
        <a
          href="/es"
          onClick={() => setIsOpen(false)}
          className={cn(
            "flex items-center gap-2 relative z-20 px-2 py-1",
            locale === "es" &&
              "opacity-50 cursor-not-allowed pointer-events-none",
          )}
        >
          <span className="text-xs font-semibold text-sea-nymph-50">es</span>{" "}
          Español
        </a>
        <a
          href="/en"
          onClick={() => setIsOpen(false)}
          className={cn(
            "flex items-center gap-2 relative z-10 px-2 py-1",
            locale === "en" &&
              "opacity-50 cursor-not-allowed pointer-events-none",
          )}
        >
          <span className="text-xs font-semibold text-sea-nymph-50">en</span>{" "}
          English
        </a>
      </li>
    </div>
  );
};

export default LanguageSelector;
