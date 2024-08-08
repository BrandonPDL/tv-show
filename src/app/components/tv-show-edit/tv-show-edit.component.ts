import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsService, TvShow } from '../../services/tv-shows.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-tv-show-edit',
  templateUrl: './tv-show-edit.component.html',
  styleUrls: ['./tv-show-edit.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TvShowEditComponent implements OnChanges {
  @Input() tvShow!: TvShow;
  @Output() update = new EventEmitter<TvShow>();
  @Output() close = new EventEmitter<void>();

  form: FormGroup;
  isDarkMode$: Observable<boolean>;

  constructor(private fb: FormBuilder, private tvShowsService: TvShowsService, private themeService: ThemeService) {
    this.form = this.fb.group({
      id: [null],
      name: [''],
      favorite: [false]
    });
    this.isDarkMode$ = this.themeService.getTheme();
  }

  ngOnChanges() {
    if (this.tvShow) {
      this.form.patchValue(this.tvShow);
    }
  }

  onSave() {
    if (this.form.valid) {
      const updatedTvShow = this.form.value as TvShow;
      this.tvShowsService.updateTvShow(updatedTvShow.id, updatedTvShow).subscribe({
        next: (tvShow) => this.update.emit(tvShow),
        error: () => alert('No se pudo actualizar la información')
      });
    }
  }

  onClose() {
    this.close.emit();
  }
}
