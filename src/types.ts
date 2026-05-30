export type Socials = {
  name: string;
  icon: string;
  text: string;
  href: string;
}[];

export type Certificate = {
  title: string;
  titleEn: string;
  url: string;
  logo: string;
  source: "threejs" | "devtalles";
};

export type Certificates = Certificate[];

export type Locale = "es" | "en";

export type Coin = "coin-1" | "coin-2";

export type CertificateSource = "threejs" | "devtalles";

export type ExperienceItem = {
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  date: string;
  dateEn: string;
  description: string[];
  descriptionEn: string[];
  type: "education" | "work" | "formation";
  url?: string;
};

export type Experiences = ExperienceItem[];
