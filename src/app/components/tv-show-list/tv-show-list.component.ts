import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsService, TvShow } from '../../services/tv-shows.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tv-show-list',
  templateUrl: './tv-show-list.component.html',
  styleUrls: ['./tv-show-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TvShowListComponent implements OnInit {
  @ViewChild('carouselTrack') carouselTrack!: ElementRef<HTMLDivElement>;
  favoriteTvShows$: Observable<TvShow[]>;

  constructor(private tvShowsService: TvShowsService) {
    this.favoriteTvShows$ = this.tvShowsService.tvShows$.pipe(
      map(tvShows => tvShows.filter(tvShow => tvShow.favorite))
    );
  }

  ngOnInit(): void {
    // No se necesita cargar los datos aquí, ya que el servicio los comparte
  }

  removeFavorite(tvShow: TvShow) {
    const updatedTvShow = { ...tvShow, favorite: false };
    this.tvShowsService.updateTvShow(tvShow.id, updatedTvShow).subscribe();
  }
}
