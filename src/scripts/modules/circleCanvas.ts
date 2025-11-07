import { ListenerResize } from "../utils/listeners";
import { ScrollObserver } from "../utils/ScrollObserver";

export class CirclesCanvas {
  private animatedCanvases = new Set<HTMLCanvasElement>();
  private observer: ScrollObserver;

  constructor() {
    this.observer = new ScrollObserver((entry, index) => {
      this.handleCanvasAnimation(entry, index);
    });
    this.init();
  }

  private init() {
    this.observer.observe('.circle');

    // Ресайз при изменении размеров окна с дебаунсом
    new ListenerResize(() => this.observer.observe('.circle'));
  }

  private handleCanvasAnimation(entry: IntersectionObserverEntry, index: number) {
    const canvas = entry.target as HTMLCanvasElement;

    if (this.animatedCanvases.has(canvas)) {
      this.drawCircle(canvas);
    } else {
      const container = canvas.closest('.adv__item');
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }

      setTimeout(() => {
        this.animateCircle(canvas, index);
      }, index * 400);
    }
  }

  // если была анимация рисую статично
  private drawCircle(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 15;
    ctx.strokeStyle = '#1e1e1e52';

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - ctx.lineWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const desiredDashes = 200;
    const dashLength = circumference / desiredDashes / 5;
    const gapLength = 3;

    console.log('test')

    ctx.setLineDash([dashLength, gapLength]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  private animateCircle(canvas: HTMLCanvasElement, index: number) {
    if (this.animatedCanvases.has(canvas)) return;
    this.animatedCanvases.add(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 15;
    ctx.strokeStyle = '#1e1e1e52';

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2 - ctx.lineWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const desiredDashes = 200;
    const dashLength = circumference / desiredDashes / 5;
    const gapLength = 3;

    ctx.setLineDash([dashLength, gapLength]);

    let progress = 0;
    const totalDashes = desiredDashes;
    const dashAngle = (2 * Math.PI) / totalDashes;

    // направление и начальный угол анимации
    let startOffset = 0;
    let direction = 1; // 1 = по часовой, -1 = против часовой

    if (index === 0) {
      startOffset = -Math.PI; // Справа (12 часов)
      direction = -1
    } else if (index === 1) {
      startOffset = Math.PI; // Слева (6 часов)
      direction = 1
    } else {
      startOffset = -Math.PI; // Справа (12 часов)
      direction = -1
    }

    const drawAnimatedCircle = () => {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.beginPath();

      // Рисуем только completedDashes штрихов
      const completedDashes = Math.floor(progress * totalDashes);

      for (let i = 0; i < completedDashes; i++) {
        const startAngle = startOffset + (i * dashAngle * direction);
        const endAngle = startAngle + (dashAngle * dashLength / (dashLength + gapLength));

        ctx?.arc(centerX, centerY, radius, startAngle, endAngle);
      }

      ctx?.stroke();

      if (progress < 1) {
        progress += 0.02; // Скорость анимации
        requestAnimationFrame(drawAnimatedCircle);
      }
    }

    drawAnimatedCircle();
  }


}

// Экспорт экземпляра класса
export const canvas = new CirclesCanvas();