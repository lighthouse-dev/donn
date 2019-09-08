import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSpendTableComponent } from './fixed-spend-table.component';

describe('FixedSpendTableComponent', () => {
  let component: FixedSpendTableComponent;
  let fixture: ComponentFixture<FixedSpendTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedSpendTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedSpendTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
