import { Component, OnInit } from '@angular/core';
import { MestaZaRelaksacijuPodaciService } from '../../mesta-za-relaksaciju-podaci.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogUspesnoComponent } from '../../../dialog/dialog-uspesno/dialog-uspesno.component'
import { DialogPotvrdaComponent } from '../../../dialog/dialog-potvrda/dialog-potvrda.component'

@Component({
  selector: 'app-izmena-podataka-mesta',
  templateUrl: './izmena-podataka-mesta.component.html',
  styleUrls: ['./izmena-podataka-mesta.component.css']
})
export class IzmenaPodatakaMestaComponent implements OnInit {

  constructor(private mestaZaRelaksaciju: MestaZaRelaksacijuPodaciService, private router : ActivatedRoute, private dialog: MatDialog) { }

  dogadjaji : any[];
  tip: string = "";
  greska: boolean = false;
  poruka : string = "";
  file: any = "";
  
  ngOnInit(): void {
    this.ucitajPodatke();
  }

  ucitajPodatke() {
    this.router.params.subscribe(params => {
      this.dogadjaji = this.mestaZaRelaksaciju.pretraziPoId(params["id"]);
    });
  }

  postaviTip(event: any) {
    this.tip = event.value;
  }

  promeniPodatke(forma: NgForm) {
    this.router.params.subscribe(params => {
      if(this.tip == ""){
        this.dogadjaji.forEach(dogadjaj => {
          this.tip = dogadjaj.tip_aktivnosti
        });
      } 
      const obavestenje = this.dialog.open(DialogPotvrdaComponent, {
        data: {
          poruka: "Da li sigurno želite da promenite podatke za ovaj dogadjaj."
        }
      });

      obavestenje.afterClosed().subscribe(isProemni => {
        if(isProemni){
          if(this.file != "") {
            this.file = this.file.name;
          } 
          if(forma.value.naziv != "" && forma.value.opis != "" && forma.value.lokacija != "" && forma.value.datum != "" &&  forma.value.vreme != "" && forma.value.trajanje != "" && this.tip != "" && forma.value.grad != "" && forma.value.slobodnaMesta != ""){
            if(this.mestaZaRelaksaciju.izmenaPodataka(forma.value.naziv, forma.value.opis, forma.value.lokacija, forma.value.datum, forma.value.vreme, forma.value.trajanje, this.tip, params["id"], this.file, forma.value.grad, forma.value.slobodnaMesta)) {
              this.dialog.open(DialogUspesnoComponent, {
                data: {
                  poruka: "Uspešno ste pormenili podatke."
                }
              });
            } else{
                this.greska = true;
                this.poruka = "Promena podataka nije uspela"
            }
        }
        }
      });
    });
  } 
}