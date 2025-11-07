import { initializeBurger, initializeMarquee, initializeSliders } from "./scripts";
import { canvas } from "./scripts/modules/circleCanvas";
import { ctaElems } from "./scripts/modules/SlideInAnimation";
import { getScrollbarWidth } from "./scripts/utils";

document.addEventListener("DOMContentLoaded", () => {
  getScrollbarWidth()

  initializeBurger();
  initializeMarquee();
  initializeSliders();

  ctaElems.init('.cta__block'); // наблюдаем за появлением контейнера
  canvas

});