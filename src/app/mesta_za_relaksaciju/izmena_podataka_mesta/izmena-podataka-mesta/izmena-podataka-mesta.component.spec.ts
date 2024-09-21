import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaPodatakaMestaComponent } from './izmena-podataka-mesta.component';

describe('IzmenaPodatakaMestaComponent', () => {
  let component: IzmenaPodatakaMestaComponent;
  let fixture: ComponentFixture<IzmenaPodatakaMestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaPodatakaMestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaPodatakaMestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
