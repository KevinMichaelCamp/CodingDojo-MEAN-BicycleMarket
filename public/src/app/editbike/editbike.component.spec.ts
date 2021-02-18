import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbikeComponent } from './editbike.component';

describe('EditbikeComponent', () => {
  let component: EditbikeComponent;
  let fixture: ComponentFixture<EditbikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
