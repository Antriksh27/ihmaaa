import { z } from 'zod';

export const ArticleSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  alias: z.string(),
  slug: z.string().min(1),
  categoryId: z.string(),
  categoryTitle: z.string(),
  created: z.string().optional(),
  introtext: z.string(),
  fulltext: z.string(),
  contentHtml: z.string(),
  metadesc: z.string().optional(),
  metakey: z.string().optional(),
  featured: z.boolean().optional(),
  images: z
    .object({
      image_intro: z.string().optional(),
      image_fulltext: z.string().optional(),
    })
    .optional(),
});

export const CategorySchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  alias: z.string(),
  description: z.string().optional(),
});

export const NavigationItemSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    title: z.string().min(1),
    href: z.string().min(1),
    badge: z.string().optional(),
    children: z.array(NavigationItemSchema).optional(),
  })
);

export const OfficeBearerSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string(),
  batch: z.string().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
});

export const SponsorSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  alias: z.string(),
  logo: z.string(),
  website: z.string().optional(),
  description: z.string().optional(),
  category: z.string(),
});

export const SiteConfigSchema = z.object({
  name: z.string(),
  fullName: z.string(),
  tagline: z.string(),
  address: z.object({
    line1: z.string(),
    line2: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    country: z.string(),
  }),
  contact: z.object({
    phoneOffice: z.string(),
    phoneMobile1: z.string(),
    phoneMobile2: z.string(),
    email: z.string(),
  }),
  bankDetails: z.object({
    bankName: z.string(),
    accountName: z.string(),
    accountNumber: z.string(),
    branch: z.string(),
    ifscCode: z.string(),
    micrCode: z.string(),
    branchAddress: z.string(),
    supportMessage: z.string(),
  }),
  socialLinks: z.object({
    facebookPage: z.string(),
    facebookGroup: z.string(),
    linkedin: z.string(),
    almaconnect: z.string(),
    youtube: z.string(),
    twitter: z.string(),
  }),
});

export type ArticleType = z.infer<typeof ArticleSchema>;
export type CategoryType = z.infer<typeof CategorySchema>;
export type OfficeBearerType = z.infer<typeof OfficeBearerSchema>;
export type SponsorType = z.infer<typeof SponsorSchema>;
