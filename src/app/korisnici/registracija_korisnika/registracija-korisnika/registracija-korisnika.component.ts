import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../../korisnik.service';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DialogUspesnoComponent } from '../../../dialog/dialog-uspesno/dialog-uspesno.component'
import { DialogGreskaComponent } from '../../../dialog/dialog-greska/dialog-greska.component'
import { Router } from '@angular/router';


@Component({
  selector: 'app-registracija-korisnika',
  templateUrl: './registracija-korisnika.component.html',
  styleUrls: ['./registracija-korisnika.component.css']
})
export class RegistracijaKorisnikaComponent implements OnInit {

  constructor(private korisnikService: KorisnikService, private dialog: MatDialog, private router : Router) { }

  interesovanja: any[] = [];
  greska: boolean = false;
  poruka: string = "";
  
  ngOnInit(): void {
  }

  cekiranoInteresovanje(interesovanje, isCekiran) {
    if(isCekiran) {
      this.interesovanja.push(interesovanje);
    } else {
        var indeks = this.interesovanja.findIndex(i => i == interesovanje);
        this.interesovanja.splice(indeks, 1);
    }
  }

  unosPodataka(forma: NgForm) {
    if(this.korisnikService.pronadjiKorisnikaUserName(forma.value.kime)) {
      this.dialog.open(DialogGreskaComponent, {
        data: {
          poruka: "Izabrano korisničko ime je zauzeto. Pokušajte da unesete neko drugo korisničko ime."
        }
      });
    } else {
        var emailFromat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isEmail = emailFromat.test(String(forma.value.email));
              
        if(forma.value.ime != "" && forma.value.prezime != "" && forma.value.sifra != "" &&  forma.value.email && forma.value.telefon != "" && forma.value.adresa != "" && forma.value.grad != "" && this.interesovanja.length != 0 && forma.value.sifra.length >= 8 && isEmail && forma.value.kime != "") {
          this.korisnikService.dodajKorisnika(forma.value.ime, forma.value.prezime, forma.value.sifra, forma.value.email, forma.value.telefon, forma.value.adresa, forma.value.grad, forma.value.kime, this.interesovanja)
          const poruka = this.dialog.open(DialogUspesnoComponent, {
            data: {
              poruka: "Uspešno ste napravili nalog."
            }
          });
          
          poruka.afterClosed().subscribe(x => {
            this.router.navigate(['/prijava']);
          });
        }  
     }
  }
}