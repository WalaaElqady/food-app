import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecipesComponent } from './add-edit-recipes.component';

describe('AddEditRecipesComponent', () => {
  let component: AddEditRecipesComponent;
  let fixture: ComponentFixture<AddEditRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditRecipesComponent]
    });
    fixture = TestBed.createComponent(AddEditRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
