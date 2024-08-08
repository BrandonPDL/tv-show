import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TvShowsService, TvShow } from '../../services/tv-shows.service';
import { TvShowEditComponent } from '../tv-show-edit/tv-show-edit.component';
import { TvShowAddComponent } from '../tv-show-add/tv-show-add.component';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, TvShowEditComponent, TvShowAddComponent]
})
export class TvShowsComponent implements OnInit {
  channels$: Observable<TvShow[]>;
  selectedTvShow: TvShow | null = null;
  isAddMode: boolean = false;
  isDarkMode$: Observable<boolean>;

  constructor(private tvShowsService: TvShowsService, private themeService: ThemeService) {
    this.channels$ = this.tvShowsService.tvShows$;
    this.isDarkMode$ = this.themeService.getTheme();
  }

  ngOnInit(): void {
    this.tvShowsService.loadTvShows();
  }

  openEditModal(tvShow: TvShow) {
    this.selectedTvShow = { ...tvShow };
  }

  closeEditModal() {
    this.selectedTvShow = null;
  }

  updateTvShow(updatedTvShow: TvShow) {
    if (updatedTvShow && updatedTvShow.id) {
      this.tvShowsService.updateTvShow(updatedTvShow.id, updatedTvShow).subscribe();
    }
    this.closeEditModal();
  }

  openAddModal() {
    this.isAddMode = true;
  }

  closeAddModal() {
    this.isAddMode = false;
  }

  addTvShow(newTvShow: TvShow) {
    this.tvShowsService.addTvShow(newTvShow).subscribe({
      next: () => {
        this.closeAddModal();
      },
      error: (error: Error) => {
        if (error.message === 'El canal ya existe.') {
          alert('El canal se creo con exito.');
        } else {
          alert('No se pudo agregar el canal. Inténtalo nuevamente.');
        }
      }
    });
  }

  deleteTvShow(id: number) {
    this.tvShowsService.deleteTvShow(id).subscribe();
  }
}
