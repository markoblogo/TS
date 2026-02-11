import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://trade-solution.eu";
  const now = new Date();

  return [
    { url: `${base}/en`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/bg`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/en/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/bg/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 }
  ];
}
