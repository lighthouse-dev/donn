import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAggregateComponent } from './private-aggregate.component';

describe('PrivateComponent', () => {
  let component: PrivateAggregateComponent;
  let fixture: ComponentFixture<PrivateAggregateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateAggregateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAggregateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
