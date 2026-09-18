import type { MetadataRoute } from "next";

const siteUrl = "https://qualityopsstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "ru", "sr"].map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: "monthly",
    priority: 1,
  }));
}
