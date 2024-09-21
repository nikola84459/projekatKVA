import { Component, OnInit } from '@angular/core';
import { MestaZaRelaksacijuPodaciService } from '../../mesta-za-relaksaciju-podaci.service';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogUspesnoComponent } from '../../../dialog/dialog-uspesno/dialog-uspesno.component'

@Component({
  selector: 'app-dodavanje-novog-mesta',
  templateUrl: './dodavanje-novog-mesta.component.html',
  styleUrls: ['./dodavanje-novog-mesta.component.css']

})
export class DodavanjeNovogMestaComponent implements OnInit {

  constructor(private mestaZaRelaksaciju: MestaZaRelaksacijuPodaciService, private dialog: MatDialog) { }
  greska: boolean = false;
  poruka: string = "";
  tip: string = "";
  file: any = "";
  
  
  ngOnInit(): void {
  }

  dodajDogadjaj(forma: NgForm) {
    if(this.file == "") {
      this.file = "bezSlike.jpg"
    } else {
        this.file = this.file.name;
    }
    console.log(forma.value.trajanje);
    if(forma.value.naziv != "" && forma.value.opis != "" && forma.value.lokacija != "" && forma.value.datum != "" && forma.value.vreme != "" && forma.value.trajanje != "" && this.tip != "" && forma.value.grad != "" && forma.value.slobodnaMesta != "") {
      this.mestaZaRelaksaciju.dodajDogadjaj(forma.value.naziv, forma.value.opis, forma.value.lokacija, forma.value.datum, forma.value.vreme, forma.value.trajanje, this.tip, this.file, forma.value.grad, forma.value.slobodnaMesta);
      this.dialog.open(DialogUspesnoComponent, {
        data: {
          poruka: "Uspešno ste napravili novi dogadjaj."
        }
      });
    }  
  }

  postaviTip(event: any) {
    this.tip = event.value;
  }
}