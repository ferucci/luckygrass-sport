import { debounce } from ".";

// Получает функцию в виде аргумента. 
// Срабатывает при ресайзе ( с дебаунсом )

export class ListenerResize {
  private funcProp: Function

  constructor(funcProp: Function) {
    this.funcProp = funcProp

    this.resize();
  }

  private resize() {
    return window.addEventListener('resize', debounce(this.funcProp.bind(this), 250));
  }
}