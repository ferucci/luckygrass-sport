import { MobileNavigation as burger } from "./burgerNav";
import { SmoothMarquee } from "./marquee";
import { sliders } from "./sliders";

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
