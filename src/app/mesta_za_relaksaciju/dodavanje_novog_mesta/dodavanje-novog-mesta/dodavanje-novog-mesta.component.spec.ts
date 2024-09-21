import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodavanjeNovogMestaComponent } from './dodavanje-novog-mesta.component';

describe('DodavanjeNovogMestaComponent', () => {
  let component: DodavanjeNovogMestaComponent;
  let fixture: ComponentFixture<DodavanjeNovogMestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodavanjeNovogMestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodavanjeNovogMestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
