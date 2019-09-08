import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFixedSpendComponent } from './add-fixed-spend.component';

describe('AddFixedSpendComponent', () => {
  let component: AddFixedSpendComponent;
  let fixture: ComponentFixture<AddFixedSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFixedSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFixedSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
