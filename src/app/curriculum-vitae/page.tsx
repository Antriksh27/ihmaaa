import React from 'react';
import { getArticlesByCategory } from '@/lib/content';
import CategoryBlog from '@/components/articles/CategoryBlog';

export default function CurriculumVitaePage() {
  const articles = getArticlesByCategory('27');

  return (
    <CategoryBlog
      title="Curriculum Vitae"
      description="Professional CVs, profiles, and career credentials of IHM Ahmedabad alumni across hospitality leadership, culinary arts, operations, and management."
      articles={articles}
      basePath="/curriculum-vitae"
    />
  );
}
