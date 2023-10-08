import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsLayoutComponent } from './films-layout.component';

describe('FilmsLayoutComponent', () => {
  let component: FilmsLayoutComponent;
  let fixture: ComponentFixture<FilmsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilmsLayoutComponent]
    });
    fixture = TestBed.createComponent(FilmsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
