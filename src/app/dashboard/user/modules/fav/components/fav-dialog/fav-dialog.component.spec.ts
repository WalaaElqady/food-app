import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavDialogComponent } from './fav-dialog.component';

describe('FavDialogComponent', () => {
  let component: FavDialogComponent;
  let fixture: ComponentFixture<FavDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavDialogComponent]
    });
    fixture = TestBed.createComponent(FavDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
