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
    color: "bg-sea-nymph-500 text-white",
    lineColor: "bg-sea-nymph-200",
  },
  work: {
    icon: FaBriefcase,
    color: "bg-sea-nymph-600 text-white",
    lineColor: "bg-sea-nymph-300",
  },
  formation: {
    icon: FaBook,
    color: "bg-sea-nymph-700 text-white",
    lineColor: "bg-sea-nymph-400",
  },
};

export default function ExperienceList({ locale }: Props) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-12 pt-4">
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-sea-nymph-200 hidden sm:block" />

        {experiences.map((item, index) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;

          return (
            <div
              key={index}
              className="relative flex flex-col sm:flex-row gap-4 pb-12 last:pb-0"
            >
              <div className="hidden sm:flex flex-col items-center shrink-0">
                <div
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center z-10 ",
                    config.color,
                  )}
                >
                  <Icon className="text-sm" />
                </div>
              </div>

              <div className="sm:hidden flex items-center gap-3 mb-2">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center ",
                    config.color,
                  )}
                >
                  <Icon className="text-xs" />
                </div>
                <span className="text-xs font-medium text-sea-nymph-500">
                  {item.type === "education"
                    ? locale === "es"
                      ? "Educación"
                      : "Education"
                    : item.type === "work"
                      ? locale === "es"
                        ? "Experiencia"
                        : "Experience"
                      : locale === "es"
                        ? "Formación"
                        : "Training"}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="bg-white/70 backdrop-blur-sm border border-sea-nymph-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:border-sea-nymph-400 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                    <h3 className="text-base sm:text-lg font-semibold text-sea-nymph-800">
                      {locale === "es" ? item.title : item.titleEn}
                    </h3>
                    {item.type === "work" && item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 w-8 h-8 rounded-full bg-sea-nymph-100 flex items-center justify-center hover:bg-sea-nymph-500 hover:text-white transition-all duration-300 text-sea-nymph-600"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    )}
                  </div>

                  <p className="text-sm font-medium text-sea-nymph-600 mb-1">
                    {locale === "es" ? item.subtitle : item.subtitleEn}
                  </p>

                  <p className="text-xs text-sea-nymph-400 mb-3">
                    {locale === "es" ? item.date : item.dateEn}
                  </p>

                  <ul className="space-y-1.5">
                    {(locale === "es"
                      ? item.description
                      : item.descriptionEn
                    ).map((desc, i) => (
                      <li
                        key={i}
                        className="text-sm text-sea-nymph-700 leading-relaxed flex gap-2"
                      >
                        <span className="text-sea-nymph-300 mt-1.5 shrink-0">
                          {item.type === "formation" ? "•" : "▸"}
                        </span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {index < experiences.length - 1 && (
                <div
                  className={cn(
                    "absolute left-[22px] top-11 bottom-0 w-0.5 hidden sm:block",
                    config.lineColor,
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
