import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import { TvShowListComponent } from './components/tv-show-list/tv-show-list.component'; 
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, TvShowsComponent, ThemeToggleComponent, TvShowListComponent] 
})
export class AppComponent {
  title = 'tv-shows-app';
  isDarkMode$: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.isDarkMode$ = this.themeService.getTheme();
  }
}
