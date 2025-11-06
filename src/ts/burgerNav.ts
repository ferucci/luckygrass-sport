export class MobileNavigation {
  private levels: HTMLElement | null;
  private burger: HTMLElement | null;
  private navLevel1: HTMLElement | null;
  private navLevel2: HTMLElement | null;
  private backButton: HTMLElement | null;
  private menuTitle: HTMLElement | null;
  private submenuLists: NodeListOf<HTMLElement>;
  private overlay: HTMLElement | null;

  constructor() {
    this.levels = document.querySelector('.mobile-nav-levels');
    this.burger = document.querySelector('.header__burger');
    this.navLevel1 = document.querySelector('.nav-level-1');
    this.navLevel2 = document.querySelector('.nav-level-2');
    this.backButton = document.querySelector('.nav-level__back');
    this.menuTitle = document.querySelector('.nav-level__title');
    this.submenuLists = document.querySelectorAll('.nav-level__list[data-menu]');
    this.overlay = document.querySelector('.overlay');

    this.init();
  }

  private init(): void {
    // Обработчик клика по пунктам меню с подменю
    document.querySelectorAll<HTMLElement>('.nav-level__link[data-submenu]').forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const submenuId = link.getAttribute('data-submenu');
        if (submenuId) {
          this.showSubmenu(submenuId, link.textContent || '');
        }
      });
    });

    // Обработчик кнопки "Назад"
    this.backButton?.addEventListener('click', () => {
      this.goBack();
    });

    // Закрытие навигации при клике на ссылку без подменю
    document.querySelectorAll<HTMLElement>('.nav-level__link:not([data-submenu])').forEach(link => {
      link.addEventListener('click', () => {
        this.overlay?.classList.remove('active');
        this.closeNavigation();
      });
    });

    // Обработчик бургер-меню
    this.burger?.addEventListener('click', () => {
      this.toggleOverlay();
      this.toggleNavigation();
    });
  }

  private showSubmenu(submenuId: string, title: string): void {
    // Скрываем все подменю
    this.submenuLists.forEach(list => {
      list.classList.remove('active');
    });

    // Показываем нужное подменю
    const targetSubmenu = document.querySelector<HTMLElement>(`.nav-level__list[data-menu="${submenuId}"]`);
    if (targetSubmenu) {
      targetSubmenu.classList.add('active');
    }

    // Обновляем заголовок
    if (this.menuTitle) {
      this.menuTitle.textContent = title;
    }

    // Переключаем уровни
    this.navLevel1?.classList.remove('active');
    this.navLevel2?.classList.add('active');
  }

  private goBack(): void {
    this.navLevel2?.classList.remove('active');
    this.navLevel1?.classList.add('active');

    // Скрываем все подменю
    this.submenuLists.forEach(list => {
      list.classList.remove('active');
    });
  }

  private toggleOverlay(): void {
    this.overlay?.classList.toggle('active');
  }

  private toggleNavigation(): void {
    this.burger?.classList.toggle('active');
    this.levels?.classList.toggle('active');

    if (!this.levels?.classList.contains('active')) {
      // При закрытии навигации возвращаемся на первый уровень
      this.goBack();
    }
  }

  private closeNavigation(): void {
    this.burger?.classList.remove('active');
    this.levels?.classList.remove('active');
    this.goBack();
  }
}