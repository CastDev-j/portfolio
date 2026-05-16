import React, { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

const routes = {
  home: "#home",
  certificates: "#certificates",
  contact: "#contact",
};

const translations = {
  es: {
    home: "Inicio",
    certificates: "Certificados",
    contact: "Contacto",
  },
  en: {
    home: "Home",
    certificates: "Certificates",
    contact: "Contact",
  },
};

interface Props {
  locale: "es" | "en";
}

const Navigation = ({ locale }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <ul className="gap-6 hidden md:flex">
        {Object.entries(routes).map(([key, value]) => (
          <li key={key}>
            <a
              href={value}
              className="relative text-sea-nymph-600 hover:text-sea-nymph-800 transition-colors group"
            >
              {translations[locale][key as keyof typeof translations.es]}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sea-nymph-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        ))}
      </ul>

      <button
        className="flex md:hidden p-2 text-sea-nymph-600 hover:text-sea-nymph-800 transition-colors z-10 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menú"
      >
        {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      <div
        className={`
          fixed top-0 left-0 w-full h-full bg-sea-nymph-500 z-10
          transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <ul className="flex flex-col items-center justify-center gap-8 h-full">
          {Object.entries(routes).map(([key, value]) => (
            <li key={key}>
              <a
                href={value}
                onClick={() => setIsMenuOpen(false)}
                className="text-sea-nymph-50 hover:text-white text-2xl font-semibold transition-colors group relative"
              >
                {translations[locale][key as keyof typeof translations.es]}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
