import { articles } from '@/content/articles';
import { categories } from '@/content/categories';
import { Article, Category } from '@/types/content';

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug || a.alias === slug);
}

export function getArticlesByCategory(categoryId: string): Article[] {
  return articles.filter((a) => a.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function cleanTitle(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((w) => {
      if (w === '---' || w === '--') return '-';
      if (w.startsWith('-') && w.endsWith('-')) {
        return w.slice(1, -1).split('-').join('');
      }
      return w;
    })
    .join(' ');
}
