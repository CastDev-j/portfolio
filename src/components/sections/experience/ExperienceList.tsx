import { experiences } from "@/config";
import type { Locale } from "@/types";
import { cn } from "@/lib/cn";
import {
  FaGraduationCap,
  FaBriefcase,
  FaBook,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface Props {
  locale: Locale;
}

const typeConfig = {
  education: {
    icon: FaGraduationCap,
    label: { es: "Educación", en: "Education" },
    badge: "bg-sea-nymph-500 text-white",
  },
  work: {
    icon: FaBriefcase,
    label: { es: "Experiencia", en: "Experience" },
    badge: "bg-sea-nymph-600 text-white",
  },
  formation: {
    icon: FaBook,
    label: { es: "Formación", en: "Training" },
    badge: "bg-sea-nymph-700 text-white",
  },
};

export default function ExperienceList({ locale }: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-12 pt-4 flex flex-col gap-4 sm:gap-5">
      {experiences.map((item, index) => {
        const config = typeConfig[item.type];
        const Icon = config.icon;

        return (
          <div
            key={index}
            className={cn(
              "bg-white/70 backdrop-blur-sm sm:border sm:border-sea-nymph-200 sm:p-6 rounded-2xl transition-all duration-300",
            )}
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div
                className={cn(
                  "hidden sm:flex w-10 h-10 rounded-xl items-center justify-center shrink-0 mt-0.5",
                  config.badge,
                )}
              >
                <Icon className="text-sm" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                  <div className="w-full sm:w-auto">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full mb-1.5",
                        config.badge,
                      )}
                    >
                      <Icon className="text-xs sm:hidden" />
                      {config.label[locale]}
                    </span>
                    <h3 className="text-sm sm:text-lg font-semibold text-sea-nymph-800 leading-snug">
                      {locale === "es" ? item.title : item.titleEn}
                    </h3>
                  </div>
                  {item.type === "work" && item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sea-nymph-100 flex items-center justify-center hover:bg-sea-nymph-500 hover:text-white transition-all duration-300 text-sea-nymph-600"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-medium text-sea-nymph-600 mb-0.5 sm:mb-1">
                  {locale === "es" ? item.subtitle : item.subtitleEn}
                </p>

                <p className="text-xs text-sea-nymph-400 mb-2 sm:mb-3">
                  {locale === "es" ? item.date : item.dateEn}
                </p>

                <ul className="space-y-1 sm:space-y-1.5">
                  {(locale === "es"
                    ? item.description
                    : item.descriptionEn
                  ).map((desc, i) => (
                    <li
                      key={i}
                      className="text-xs sm:text-sm text-sea-nymph-700 leading-relaxed flex gap-2 items-baseline"
                    >
                      <span className="text-sea-nymph-300 leading-none shrink-0">
                        {item.type === "formation" ? "•" : "▸"}
                      </span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
