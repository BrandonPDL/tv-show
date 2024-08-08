import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environments';

import { AppComponent } from './app.component';
import { TvShowsComponent } from './components/tv-shows/tv-shows.component';
import { TvShowsService } from './services/tv-shows.service';
import { themeReducer } from './state/theme/theme.reducer';
import { TvShowListComponent } from './components/tv-show-list/tv-show-list.component'; 


@NgModule({
  declarations: [
    
  ],
  imports: [
    TvShowListComponent,
    TvShowsComponent,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ theme: themeReducer }),
  ],
  providers: [TvShowsService],
  bootstrap: []
})
export class AppModule { }
