import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFixedSpendComponent } from './edit-fixed-spend.component';

describe('EditFixedSpendComponent', () => {
  let component: EditFixedSpendComponent;
  let fixture: ComponentFixture<EditFixedSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFixedSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFixedSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
