import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormCardComponent } from './reactive-form-card.component';

describe('ReactiveFormCardComponent', () => {
  let component: ReactiveFormCardComponent;
  let fixture: ComponentFixture<ReactiveFormCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactiveFormCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
