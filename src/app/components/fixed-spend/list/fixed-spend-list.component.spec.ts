import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedSpendListComponent } from './fixed-spend-list.component';

describe('FixedSpendListComponent', () => {
  let component: FixedSpendListComponent;
  let fixture: ComponentFixture<FixedSpendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedSpendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedSpendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
