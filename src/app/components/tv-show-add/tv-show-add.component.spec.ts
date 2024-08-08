import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowAddComponent } from './tv-show-add.component';

describe('TvShowAddComponent', () => {
  let component: TvShowAddComponent;
  let fixture: ComponentFixture<TvShowAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
