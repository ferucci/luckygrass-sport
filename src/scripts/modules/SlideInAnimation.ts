import { ScrollObserver } from "../utils/ScrollObserver";

export class SlideInAnimation {
  private observer: ScrollObserver;

  constructor() {
    this.observer = new ScrollObserver((entry) => {
      // Когда контейнер появляется в viewport - запускаем анимацию его элементов
      this.animateElements(entry.target, '.cta__rotated-text');
    }, { threshold: 0.3 });
  }

  init(containerSelector: string) {
    this.observer.observe(containerSelector);
  }

  animateElements(container: Element, selector: string) {
    const elements = container.querySelectorAll(selector) as NodeListOf<HTMLElement>;

    elements.forEach((element, index) => {
      setTimeout(() => {
        this.animateElement(element);
      }, index * 200);
    });
  }

  private animateElement(element: HTMLElement) {
    element.style.transform = 'translateY(100px)';
    element.style.opacity = '0';
    element.style.transition = 'all 0.6s ease-out';

    setTimeout(() => {
      element.style.transform = 'translateY(0)';
      element.style.opacity = '1';
    }, 10);
  }
}

// Использование
export const ctaElems = new SlideInAnimation();