import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecipesComponent } from './components/list-user-recipes/user-recipes.component';

describe('UserRecipesComponent', () => {
  let component: UserRecipesComponent;
  let fixture: ComponentFixture<UserRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRecipesComponent]
    });
    fixture = TestBed.createComponent(UserRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
