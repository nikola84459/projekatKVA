import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGreskaComponent } from './dialog-greska.component';

describe('DialogGreskaComponent', () => {
  let component: DialogGreskaComponent;
  let fixture: ComponentFixture<DialogGreskaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogGreskaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogGreskaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
