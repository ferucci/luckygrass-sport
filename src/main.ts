import { initializeBurger, initializeMarquee, initializeSliders } from "./scripts";
import { getScrollbarWidth } from "./scripts/utils";

document.addEventListener("DOMContentLoaded", () => {
  getScrollbarWidth()

  initializeBurger();
  initializeMarquee();
  initializeSliders();


});