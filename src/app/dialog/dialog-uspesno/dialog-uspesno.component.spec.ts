import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUspesnoComponent } from './dialog-uspesno.component';

describe('DialogUspesnoComponent', () => {
  let component: DialogUspesnoComponent;
  let fixture: ComponentFixture<DialogUspesnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUspesnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUspesnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
