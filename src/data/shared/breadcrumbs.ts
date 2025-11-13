export interface BreadcrumbItem {
  name: string;
  url?: string;
  active: boolean;
}

export const breadcrumbs = {
  // Для главной страницы
  home: [
    { name: "Главная", url: "/", active: true }
  ] as BreadcrumbItem[],

  // Для страницы блога
  blog: [
    { name: "Главная", url: "/", active: false },
    { name: "Блог", url: "", active: true }
  ] as BreadcrumbItem[],

  // Для страницы статьи
  article: [
    { name: "Главная", url: "/", active: false },
    { name: "Блог", url: "/blog", active: false },
    { name: "Экипировка АО «Мосметрострой» на СтройСпортФесте 2025", url: "", active: true }
  ] as BreadcrumbItem[],

};