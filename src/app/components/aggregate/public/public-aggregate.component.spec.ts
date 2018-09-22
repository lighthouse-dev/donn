import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicAggregateComponent } from './public-aggregate.component';

describe('PublicComponent', () => {
  let component: PublicAggregateComponent;
  let fixture: ComponentFixture<PublicAggregateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicAggregateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicAggregateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
