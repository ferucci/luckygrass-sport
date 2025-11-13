export interface FilterOption {
  value: string;
  text: string;
}

export const filterOptions = [
  { value: "", text: "Все статьи" },
  { value: "science", text: "Наука" },
  { value: "health", text: "Здоровье" },
  { value: "business", text: "Бизнес" },
  { value: "technology", text: "Технологии" }
] as FilterOption[];