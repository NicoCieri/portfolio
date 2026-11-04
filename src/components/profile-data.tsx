import type { Locale } from "@/i18n/config";
import { localePaths } from "@/i18n/config";
import { site } from "@/lib/site";

export function ProfileData({ locale }: { locale: Locale }) {
  const personId = `${site.url}/#person`;
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}${localePaths[locale]}#profile`,
    url: `${site.url}${localePaths[locale]}`,
    name: site.title,
    description: site.descriptions[locale],
    inLanguage: locale,
    mainEntity: {
      "@type": "Person", "@id": personId,
      name: site.name, url: site.url, jobTitle: "Senior Frontend Engineer",
      image: `${site.url}/images/nicolas-hero.webp`, sameAs: [site.linkedin],
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
