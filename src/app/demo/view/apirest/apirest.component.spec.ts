import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APIRestComponent } from './apirest.component';

describe('APIRestComponent', () => {
  let component: APIRestComponent;
  let fixture: ComponentFixture<APIRestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ APIRestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(APIRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
