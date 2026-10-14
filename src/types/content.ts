export interface Article {
  id: string;
  title: string;
  alias: string;
  slug: string;
  categoryId: string;
  categoryTitle: string;
  created: string;
  introtext: string;
  fulltext: string;
  contentHtml: string;
  metadesc?: string;
  metakey?: string;
  featured?: boolean;
  images?: {
    image_intro?: string;
    image_fulltext?: string;
  };
}

export interface Category {
  id: string;
  title: string;
  alias: string;
  description: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  url: string;
  level: number;
  parentId: string;
  children?: NavigationItem[];
  isExternal?: boolean;
}

export interface OfficeBearer {
  id: string;
  name: string;
  role: string;
  image: string;
  batch?: string;
  bio?: string;
  phone?: string;
  email?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  alias: string;
  logo: string;
  website?: string;
  description?: string;
  category: string;
}
