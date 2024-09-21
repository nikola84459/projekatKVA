import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaPodatakaKorisnikaComponent } from './izmena-podataka-korisnika.component';

describe('IzmenaPodatakaKorisnikaComponent', () => {
  let component: IzmenaPodatakaKorisnikaComponent;
  let fixture: ComponentFixture<IzmenaPodatakaKorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaPodatakaKorisnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaPodatakaKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
