import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';

export interface TvShow {
  id: number;
  name: string;
  favorite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  private apiUrl = environment.apiUrl;
  private tvShowsSubject = new BehaviorSubject<TvShow[]>([]);
  tvShows$ = this.tvShowsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadTvShows(): void {
    this.http.get<TvShow[]>(this.apiUrl).pipe(
      catchError(this.handleError),
      tap((tvShows) => this.tvShowsSubject.next(tvShows))
    ).subscribe();
  }

  updateTvShow(id: number, tvShow: TvShow): Observable<TvShow> {
    return this.http.put<TvShow>(`${this.apiUrl}/${id}`, tvShow).pipe(
      catchError(this.handleError),
      tap(() => this.loadTvShows())
    );
  }

  addTvShow(tvShow: TvShow): Observable<TvShow> {
    return this.http.post<TvShow>(this.apiUrl, tvShow).pipe(
      catchError(this.handleAddError),
      tap(() => this.loadTvShows())
    );
  }

  deleteTvShow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError),
      tap(() => this.loadTvShows())
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    return throwError(() => new Error('Falla en el servidor'));
  }

  private handleAddError(error: HttpErrorResponse) {
    if (error.status === 409) {
      return throwError(() => new Error('El canal ya existe.'));
    }
    return this.handleError(error);
  }
}
