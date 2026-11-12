import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Lilianne Acupuncture — Acupuncture à Valleyfield",
  description:
    "Acupuncture à Valleyfield avec des soins attentionnés et personnalisés dans un espace paisible.",
  alternates: {
    canonical: "/fr",
    languages: {
      en: "/en",
      fr: "/fr",
      "x-default": "/fr",
    },
  },
};

export default function Page() {
  redirect("/fr");
}
