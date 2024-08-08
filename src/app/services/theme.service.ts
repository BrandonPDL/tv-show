import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private initialState = false; // Modo claro por defecto
  private themeSubject$ = new BehaviorSubject<boolean>(this.initialState);
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    const storedTheme = localStorage.getItem('isDarkMode');
    if (storedTheme !== null) {
      const isDarkMode = JSON.parse(storedTheme);
      this.themeSubject$.next(isDarkMode);
      this.updateDocumentClasses(isDarkMode);
    }
  }

  getTheme(): Observable<boolean> {
    return this.themeSubject$.asObservable();
  }

  setTheme(isDarkMode: boolean) {
    this.themeSubject$.next(isDarkMode);
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    this.updateDocumentClasses(isDarkMode);
  }

  toggleTheme() {
    const currentTheme = this.themeSubject$.getValue();
    this.setTheme(!currentTheme);
  }

  private updateDocumentClasses(isDarkMode: boolean) {
    if (isDarkMode) {
      this.renderer.addClass(document.documentElement, 'dark-mode');
      this.renderer.addClass(document.body, 'dark-mode');
      this.updateChannelClasses('add');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark-mode');
      this.renderer.removeClass(document.body, 'dark-mode');
      this.updateChannelClasses('remove');
    }
  }

  private updateChannelClasses(action: 'add' | 'remove') {
    const channels = document.querySelectorAll('.Channel');
    channels.forEach(channel => {
      if (action === 'add') {
        this.renderer.addClass(channel, 'dark-mode-channel');
      } else {
        this.renderer.removeClass(channel, 'dark-mode-channel');
      }
    });
  }
}
