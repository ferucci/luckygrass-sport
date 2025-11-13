export interface BreadcrumbItem {
  name: string;
  url?: string;
  active: boolean;
}

// Динамические данные хлебных крошек для страниц
export const breadcrumbs = {

  blog: [
    { name: "Главная", url: "/", active: false },
    { name: "Блог", url: "", active: true }
  ] as BreadcrumbItem[],

  article: [
    { name: "Главная", url: "/", active: false },
    { name: "Блог", url: "/blog", active: false },
    { name: "Экипировка АО «Мосметрострой» на СтройСпортФесте 2025", url: "", active: true }
  ] as BreadcrumbItem[],

};