import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendPrivateListComponent } from './spend-private-list.component';

describe('SpendPrivateListComponent', () => {
  let component: SpendPrivateListComponent;
  let fixture: ComponentFixture<SpendPrivateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendPrivateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendPrivateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
