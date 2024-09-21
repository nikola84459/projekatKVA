import { Component, OnInit } from '@angular/core';
import { MestaZaRelaksacijuPodaciService } from '../../mesta-za-relaksaciju-podaci.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogUspesnoComponent } from '../../../dialog/dialog-uspesno/dialog-uspesno.component'
import { DialogPotvrdaComponent } from '../../../dialog/dialog-potvrda/dialog-potvrda.component'


@Component({
  selector: 'app-rezervacije',
  templateUrl: './rezervacije.component.html',
  styleUrls: ['./rezervacije.component.css']
})
export class RezervacijeComponent implements OnInit {
  greska: boolean = true;
  poruka: string = "";
  
  constructor(private mestaZaRelaksaciju: MestaZaRelaksacijuPodaciService, private dialog: MatDialog) { }
  rezervacije: any[];

  ngOnInit(): void {
    this.pretraziRezervacije();
  }

  pretraziRezervacije() {
    this.rezervacije = this.mestaZaRelaksaciju.pretraziRezervisane();
  }

  otkaziRezervaciju(dogadjajId: number) {
    const obavestenje = this.dialog.open(DialogPotvrdaComponent, {
      data: {
        poruka: "Da li sigurno želite da oktažete rezervaciju."
      }
    });

    obavestenje.afterClosed().subscribe(isOtkazi => {
      if(isOtkazi) {
        if(this.mestaZaRelaksaciju.obrisiRezervaciju(dogadjajId)) {
          this.dialog.open(DialogUspesnoComponent, {
            data: {
              poruka: "Uspešno ste otkazali rezervaciju."
            }
          });
          this.rezervacije = this.mestaZaRelaksaciju.pretraziRezervisane();
        } else {
            this.greska = true;
            this.poruka = "Rezervacija nije otkazana."  
        }
      }
    });
  }
}