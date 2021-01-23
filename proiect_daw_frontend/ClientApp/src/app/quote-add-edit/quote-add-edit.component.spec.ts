import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteAddEditComponent } from './quote-add-edit.component';

describe('QuoteAddEditComponent', () => {
  let component: QuoteAddEditComponent;
  let fixture: ComponentFixture<QuoteAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
