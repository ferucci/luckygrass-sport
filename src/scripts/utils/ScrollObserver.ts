export class ScrollObserver {
  private observer: IntersectionObserver;
  private animatedElements = new Set<Element>();

  constructor(
    callback: (entry: IntersectionObserverEntry, index: number) => void,
    options: IntersectionObserverInit = { threshold: 0.3 },
    container?: Element // ДОБАВИЛ КОНТЕЙНЕР
  ) {
    this.observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      const sortedEntries = visibleEntries.sort((a, b) => {
        const elements = Array.from(container ? container.querySelectorAll(this.getSelectorFromEntry(a)) : document.querySelectorAll(this.getSelectorFromEntry(a)));
        return elements.indexOf(a.target) - elements.indexOf(b.target);
      });

      sortedEntries.forEach((entry, index) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animatedElements.add(entry.target);
          callback(entry, index);
        }
      });
    }, options);

    // ЕСЛИ ЕСТЬ КОНТЕЙНЕР - НАБЛЮДАЕМ ЗА НИМ
    if (container) {
      this.observer.observe(container);
    }
  }

  observe(elements: Element | NodeListOf<Element> | string, container?: Element) {
    if (typeof elements === 'string') {
      const targetElements = container ? container.querySelectorAll(elements) : document.querySelectorAll(elements);
      targetElements.forEach(el => this.observer.observe(el));
    } else if (elements instanceof NodeList) {
      elements.forEach(el => this.observer.observe(el));
    } else {
      this.observer.observe(elements);
    }
  }

  // остальные методы без изменений
  unobserve(element: Element) {
    this.observer.unobserve(element);
  }

  disconnect() {
    this.observer.disconnect();
  }

  private getSelectorFromEntry(entry: IntersectionObserverEntry): string {
    return entry.target.tagName.toLowerCase();
  }
}