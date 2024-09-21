import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapraviRezervacijuComponent } from './napravi-rezervaciju.component';

describe('NapraviRezervacijuComponent', () => {
  let component: NapraviRezervacijuComponent;
  let fixture: ComponentFixture<NapraviRezervacijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NapraviRezervacijuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NapraviRezervacijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
