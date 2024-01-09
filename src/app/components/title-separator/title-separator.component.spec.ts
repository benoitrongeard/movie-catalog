import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleSeparatorComponent } from './title-separator.component';

describe('TitleSeparatorComponent', () => {
  let component: TitleSeparatorComponent;
  let fixture: ComponentFixture<TitleSeparatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleSeparatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
