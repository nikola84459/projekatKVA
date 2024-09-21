import { Component, OnInit } from '@angular/core';
import { MestaZaRelaksacijuPodaciService } from '../../mesta-za-relaksaciju-podaci.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogUspesnoComponent } from '../../../dialog/dialog-uspesno/dialog-uspesno.component'
import { DialogPotvrdaComponent } from '../../../dialog/dialog-potvrda/dialog-potvrda.component'


@Component({
  selector: 'app-izmena-mesta',
  templateUrl: './izmena-mesta.component.html',
  styleUrls: ['./izmena-mesta.component.css']
})
export class IzmenaMestaComponent implements OnInit {
  
  constructor(private mestaZaRelaksaciju: MestaZaRelaksacijuPodaciService, private dialog: MatDialog) { }

  dogadjaji : any[];
  greska : boolean = false;
  poruka : string = "";


  ngOnInit(): void {
    this.ucitajMesta()
  }

  ucitajMesta() {
    this.dogadjaji = this.mestaZaRelaksaciju.dogadjajiZaIzmenu();
  }

  brisanje(id) {
    const potvrda = this.dialog.open(DialogPotvrdaComponent, {
      data: {
        poruka: "Da li sigurno želite da obrišete ovaj dogadjaj?"
      }
    });

    potvrda.afterClosed().subscribe(isObrisati => {
      if(isObrisati) {
        if(this.mestaZaRelaksaciju.obrisiDogadjaj(id)){
          this.dialog.open(DialogUspesnoComponent, {
            data: {
              poruka: "Uspešno ste obrisali dogadjaj"
            }
          });
  
          this.dogadjaji = this.mestaZaRelaksaciju.dogadjajiZaIzmenu();
        } else {
            this.greska = true;
            this.poruka = "Brisanje dogadjaja nije supelo."
        }
      }
    })
  }

  otkazivanje(id) {
    const potvrda = this.dialog.open(DialogPotvrdaComponent, {
      data: {
        poruka: "Da li sigurno želite da otkažete ovaj dogadjaj?"
      }
    });

    potvrda.afterClosed().subscribe(isOtkazati => {
      if(isOtkazati) {
        if(this.mestaZaRelaksaciju.otkazi(id)) {
          this.dialog.open(DialogUspesnoComponent, {
            data: {
              poruka: "Uspešno ste otkazali dogadjaj"
            }
          });
        } else {
            this.greska = true;
            this.poruka = "Dogadjaj nije otkazan."
        }
      }
    })
    
  }

  postaviKaoDostupan(id) {
    const potvrda = this.dialog.open(DialogPotvrdaComponent, {
      data: {
        poruka: "Da li sigurno želite da postavite ovaj dogadjaj ponovo kao dostupan?"
      }
    });

    potvrda.afterClosed().subscribe(isPostaviti => {
      if(isPostaviti) {
        if(this.mestaZaRelaksaciju.postaviKaoDostupan(id)) {
          this.dialog.open(DialogUspesnoComponent, {
            data: {
              poruka: "Uspešno ste postavili dogadjaj kao dostupan."
            }
          });
        } else {
            this.greska = true;
            this.poruka = "Postavljanje dogadjaja kao dostupan nije uspelo."
        }
      }
    }); 
  }
}  