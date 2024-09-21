import { Component, OnInit } from '@angular/core';
import { MestaZaRelaksacijuPodaciService } from '../../mesta-za-relaksaciju-podaci.service';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogUspesnoComponent } from '../../../dialog/dialog-uspesno/dialog-uspesno.component'

@Component({
  selector: 'app-istorija',
  templateUrl: './istorija.component.html',
  styleUrls: ['./istorija.component.css']
})
export class IstorijaComponent implements OnInit {
  greska: boolean = false;
  poruka: string = "";

  constructor(private mestaZaRelaksaciju: MestaZaRelaksacijuPodaciService, private dialog: MatDialog) { }

  istorija: any[];

  ngOnInit(): void {
    this.istorijaPretraga();
  }

  istorijaPretraga() {
    this.istorija = this.mestaZaRelaksaciju.pretraziIstorija();
    
  }

  napisiKomentar(forma: NgForm, dogadjajId: number) {
    if(forma.value.komentar != "") {  
      console.log(forma.value.komentar);
      if(this.mestaZaRelaksaciju.dodajKomentar(dogadjajId, forma.value.komentar)) {
        this.dialog.open(DialogUspesnoComponent, {
          data: {
            poruka: "Uspešno ste napisali komentar."
          }
        });
      } else {
          this.greska = true
          this.poruka = "Unos Vašeg komentara nije uspeo."  
      }
    }  
  }
}