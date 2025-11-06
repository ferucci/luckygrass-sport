export class SmoothMarquee {
  private container: HTMLElement;
  private track: HTMLElement;
  private speed: number;
  private position: number;
  private isPaused: boolean;
  private animationId: number | null;
  private contentWidth: number;
  private items: string[];

  constructor(container: HTMLElement, speed: number = 2) {
    this.container = container;
    this.track = container.querySelector('#marqueeTrack') as HTMLElement;
    this.speed = speed;
    this.position = 0;
    this.isPaused = false;
    this.animationId = null;
    this.contentWidth = 0;

    this.items = [
      "LUCKYGRASS - Российский производитель спортивной формы с 2011 г",
      " LUCKYGRASS - Российский производитель спортивной формы с 2011 г ",
      " LUCKYGRASS - Российский производитель спортивной формы с 2011 г ",
      " LUCKYGRASS - Российский производитель спортивной формы с 2011 г ",
      " LUCKYGRASS - Российский производитель спортивной формы с 2011 г "
    ];

    this.init();
  }

  private init(): void {
    // Создаем элементы и их дубликаты
    this.createContent();

    // Рассчитываем общую ширину оригинального контента
    this.contentWidth = this.calculateContentWidth();

    // Запускаем анимацию
    this.animate();

    // Пауза при наведении
    this.container.addEventListener('mouseenter', () => this.isPaused = true);
    this.container.addEventListener('mouseleave', () => this.isPaused = false);

    // Оптимизация для ресайза
    window.addEventListener('resize', () => {
      this.contentWidth = this.calculateContentWidth();
    });
  }

  private createContent(): void {
    // Создаем оригинальные элементы
    this.items.forEach((text) => {
      const item = document.createElement('div');
      item.className = 'marquee-item';
      item.textContent = text;
      this.track.appendChild(item);
    });

    // Создаем дубликаты для бесшовной анимации
    this.items.forEach((text) => {
      const item = document.createElement('div');
      item.className = 'marquee-item';
      item.textContent = text;
      this.track.appendChild(item);
    });
  }

  private calculateContentWidth(): number {
    // Ширина только оригинальных элементов (первая половина)
    const originalItems = Array.from(this.track.children).slice(0, this.items.length) as HTMLElement[];
    return originalItems.reduce((total, item) => total + item.offsetWidth, 0);
  }

  private animate(): void {
    if (!this.isPaused) {
      this.position -= this.speed;

      // Когда проскроллили на ширину оригинального контента,
      // сбрасываем позицию для бесшовного перехода
      if (Math.abs(this.position) >= this.contentWidth) {
        this.position = 0;
      }

      this.track.style.transform = `translateX(${this.position}px)`;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  public setSpeed(newSpeed: number): void {
    this.speed = newSpeed;
  }

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}


// // Управление скоростью
// function setSpeed(speed: number): void {
//   marquee.setSpeed(speed);

//   // Обновляем активную кнопку
//   document.querySelectorAll('.speed-btn').forEach(btn => {
//     btn.classList.remove('active');
//   });

//   // Если функция вызывается через событие, можно использовать event
//   const event = window.event as Event;
//   if (event && event.target) {
//     (event.target as HTMLElement).classList.add('active');
//   }
// }

// // Альтернативная версия с явным параметром события
// function setSpeedWithEvent(speed: number, event: Event): void {
//   marquee.setSpeed(speed);

//   // Обновляем активную кнопку
//   document.querySelectorAll('.speed-btn').forEach(btn => {
//     btn.classList.remove('active');
//   });

//   (event.currentTarget as HTMLElement).classList.add('active');
// }