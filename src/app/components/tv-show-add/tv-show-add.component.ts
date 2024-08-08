import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TvShowsService, TvShow } from '../../services/tv-shows.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-tv-show-add',
  templateUrl: './tv-show-add.component.html',
  styleUrls: ['./tv-show-add.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TvShowAddComponent {
  @Output() add = new EventEmitter<TvShow>();
  @Output() close = new EventEmitter<void>();

  form: FormGroup;
  isSubmitting = false; // Variable para evitar múltiples envíos
  isDarkMode$: Observable<boolean>;

  constructor(private fb: FormBuilder, private tvShowsService: TvShowsService, private themeService: ThemeService) {
    this.form = this.fb.group({
      name: [''],
      favorite: [false]
    });
    this.isDarkMode$ = this.themeService.getTheme();
  }

  onSave() {
    if (this.isSubmitting) {
      return; // Si ya se está enviando, no hacer nada
    }
    this.isSubmitting = true; // Marcar como enviando

    if (this.form.valid) {
      const newTvShow = this.form.value as TvShow;
      this.tvShowsService.addTvShow(newTvShow).subscribe({
        next: (tvShow) => {
          this.add.emit(tvShow);
          this.isSubmitting = false; // Marcar como no enviando después de completar
        },
        error: () => {
          alert('No se pudo agregar el nuevo canal');
          this.isSubmitting = false; // Marcar como no enviando después de error
        }
      });
    }
  }

  onClose() {
    this.close.emit();
  }
}
