import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MestaZaRelaksacijuPodaciService } from '../mesta-za-relaksaciju-podaci.service';
import {MatDialog} from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { DialogUspesnoComponent } from '../../dialog/dialog-uspesno/dialog-uspesno.component'
import { DialogGreskaComponent } from '../../dialog/dialog-greska/dialog-greska.component'
import { DialogPotvrdaComponent } from '../../dialog/dialog-potvrda/dialog-potvrda.component'


@Component({
  selector: 'app-izmena-rezervacije',
  templateUrl: './izmena-rezervacije.component.html',
  styleUrls: ['./izmena-rezervacije.component.css']
})
export class IzmenaRezervacijeComponent implements OnInit {

  constructor(private router : ActivatedRoute, private router1 : Router, private mestaZaRelaksaciju: MestaZaRelaksacijuPodaciService, private dialog: MatDialog) { }

  dogadjaji: any[];
  brojOsoba : number = 0;
  greska : boolean = false;
  poruka : string = "";

  ngOnInit(): void {
    this.pretrazi();

  }

  pretrazi() {
    this.router.params.subscribe(params => {
      this.dogadjaji = this.mestaZaRelaksaciju.pretraziPoId(params["id"]);
      this.brojOsoba = this.mestaZaRelaksaciju.vratiBrojOsoba(params["id"]);
    });

  }
  
  izmeniRezervaciju(forma: NgForm) {
    
    this.router.params.subscribe(params => {
    
      var potvrda = this.dialog.open(DialogPotvrdaComponent, {
        data: {
          poruka: "Da li sigurno želite da izmenite rezervaciju."
        }
      });

      potvrda.afterClosed().subscribe(isIzmeni => {
        if(isIzmeni) {
          if(!this.mestaZaRelaksaciju.izmenaRezervacije(params["id"], forma.value.brojOsoba)) {
            var uspesno = this.dialog.open(DialogUspesnoComponent, {
              data: {
                poruka: "Uspešno ste izmenili rezervaciju."
              }
            });
            uspesno.afterClosed().subscribe(x => {
              this.router1.navigate(['/rezervacije']);
            });
          } else {
              this.dialog.open(DialogGreskaComponent, {
                data: {
                  poruka: "Nema dovoljno slobodnih mesta kako bi ste izvršili izmenu rezervacije."
                }
              });
          }
        }
      });
    });  
  }
}