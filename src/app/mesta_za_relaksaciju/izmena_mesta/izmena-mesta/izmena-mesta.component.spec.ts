import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaMestaComponent } from './izmena-mesta.component';

describe('IzmenaMestaComponent', () => {
  let component: IzmenaMestaComponent;
  let fixture: ComponentFixture<IzmenaMestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmenaMestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaMestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
