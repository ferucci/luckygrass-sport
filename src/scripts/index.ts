import { MobileNavigation as burger } from "./modules/burgerNav";
import { SmoothMarquee } from "./modules/marquee";
import { sliders } from "./modules/sliders";

export function initializeMarquee(): void {
  const marqueeContainer = document.querySelector('.marquee-container') as HTMLElement;

  if (marqueeContainer) {
    new SmoothMarquee(marqueeContainer, 1);
  }
}

export function initializeBurger(): void {
  new burger();
}

export const initializeSliders = (): void => {
  sliders();
}
