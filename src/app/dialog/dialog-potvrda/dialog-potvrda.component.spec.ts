import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPotvrdaComponent } from './dialog-potvrda.component';

describe('DialogPotvrdaComponent', () => {
  let component: DialogPotvrdaComponent;
  let fixture: ComponentFixture<DialogPotvrdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPotvrdaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPotvrdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
