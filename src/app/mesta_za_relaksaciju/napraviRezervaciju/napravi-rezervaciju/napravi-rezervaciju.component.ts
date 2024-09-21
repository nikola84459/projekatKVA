import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MestaZaRelaksacijuPodaciService } from '../../mesta-za-relaksaciju-podaci.service';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogUspesnoComponent } from '../../../dialog/dialog-uspesno/dialog-uspesno.component'
import { DialogGreskaComponent } from '../../../dialog/dialog-greska/dialog-greska.component'

@Component({
  selector: 'app-napravi-rezervaciju',
  templateUrl: './napravi-rezervaciju.component.html',
  styleUrls: ['./napravi-rezervaciju.component.css']
})
export class NapraviRezervacijuComponent implements OnInit {
  
  greska: boolean = false;
  poruka: string = "";
  
  constructor(private router : ActivatedRoute, private router1 : Router, private mestaZaRelaksaciju: MestaZaRelaksacijuPodaciService, private dialog: MatDialog) { }
  dogadjaji: any[];

  ngOnInit(): void {
   this.pronadjiDogadjaj();
  }
  
  pronadjiDogadjaj() {
    this.router.params.subscribe(params => {
      this.dogadjaji = this.mestaZaRelaksaciju.pretraziPoId(params["id"]);
    });
  }

  rezervisi(forma: NgForm) {
    this.router.params.subscribe(params => {
      if(forma.value.brojOsoba != "" && forma.value.brojOsoba != 0) {
        if(!this.mestaZaRelaksaciju.napraviRezervaciju(params["id"], forma.value.brojOsoba)) {
          var poruka = this.dialog.open(DialogUspesnoComponent, {
            data: {
              poruka: "Uspešno ste rezervisali dogadjaj."
            }
          });  
          poruka.afterClosed().subscribe(x =>{
            this.router1.navigate(['/pretraga']);
          });      
        } else {
            this.dialog.open(DialogGreskaComponent, {
              data: {
                poruka: "Žao name je. Nema dovoljno slobodnih mesta za uneti broj osoba."
              }
            });  
        }    
      } 
    });  
  }
}