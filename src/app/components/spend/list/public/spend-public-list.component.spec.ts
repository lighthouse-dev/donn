import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendPublicListComponent } from './spend-public-list.component';

describe('SpendListComponent', () => {
  let component: SpendPublicListComponent;
  let fixture: ComponentFixture<SpendPublicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendPublicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendPublicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
