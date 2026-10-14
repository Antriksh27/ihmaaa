import { articles } from '@/content/articles';
import { categories } from '@/content/categories';
import { navigationMenu } from '@/content/navigation';
import { officeBearers } from '@/content/office-bearers';
import { sponsors } from '@/content/sponsors';
import { siteConfig } from '@/content/site-config';
import {
  ArticleSchema,
  CategorySchema,
  NavigationItemSchema,
  OfficeBearerSchema,
  SponsorSchema,
  SiteConfigSchema,
} from '@/types/schemas';

export function validateAllContent() {
  const errors: string[] = [];

  // Validate articles
  articles.forEach((art, index) => {
    const res = ArticleSchema.safeParse(art);
    if (!res.success) {
      errors.push(`Article [${index}] '${art.title}': ${res.error.message}`);
    }
  });

  // Validate categories
  categories.forEach((cat, index) => {
    const res = CategorySchema.safeParse(cat);
    if (!res.success) {
      errors.push(`Category [${index}] '${cat.title}': ${res.error.message}`);
    }
  });

  // Validate navigation
  navigationMenu.forEach((nav, index) => {
    const res = NavigationItemSchema.safeParse(nav);
    if (!res.success) {
      errors.push(`Navigation [${index}] '${nav.title}': ${res.error.message}`);
    }
  });

  // Validate office bearers
  officeBearers.forEach((ob, index) => {
    const res = OfficeBearerSchema.safeParse(ob);
    if (!res.success) {
      errors.push(`OfficeBearer [${index}] '${ob.name}': ${res.error.message}`);
    }
  });

  // Validate sponsors
  sponsors.forEach((sp, index) => {
    const res = SponsorSchema.safeParse(sp);
    if (!res.success) {
      errors.push(`Sponsor [${index}] '${sp.name}': ${res.error.message}`);
    }
  });

  // Validate siteConfig
  const configRes = SiteConfigSchema.safeParse(siteConfig);
  if (!configRes.success) {
    errors.push(`SiteConfig: ${configRes.error.message}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    stats: {
      articlesCount: articles.length,
      categoriesCount: categories.length,
      navigationCount: navigationMenu.length,
      officeBearersCount: officeBearers.length,
      sponsorsCount: sponsors.length,
    },
  };
}
