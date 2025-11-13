import { breadcrumbs } from '../shared/breadcrumbs';
import { filterOptions } from '../shared/filter-options';

export const blogData = {
  title: "Блог - Последние статьи",
  breadcrumbs: breadcrumbs.blog,
  filterOptions: filterOptions,
  posts: [
    {
      id: 1,
      title: "Первая статья",
      excerpt: "Краткое описание...",
      category: "technology"
    },
    // ... другие посты
  ]
};