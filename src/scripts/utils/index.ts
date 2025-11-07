export const scrollLock = {
  lock() {
    // Получаем ширину скроллбара
    // const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add('no-scroll');
  },

  unlock() {
    document.body.style.paddingRight = '';
    document.body.classList.remove('no-scroll');
  }
};

// Дебаунс функция
export function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function getScrollbarWidth() {
  // Создаем временный элемент
  const scrollDiv = document.createElement('div');

  // Устанавливаем стили для элемента
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.left = '-9999px';

  // Добавляем элемент в DOM
  document.body.appendChild(scrollDiv);

  // Вычисляем ширину скроллбара
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  // Удаляем временный элемент
  document.body.removeChild(scrollDiv);

  // Сохраняем значение в CSS-переменной
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

  return scrollbarWidth;
}