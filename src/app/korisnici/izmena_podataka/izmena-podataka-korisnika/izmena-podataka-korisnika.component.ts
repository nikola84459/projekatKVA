import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../../korisnik.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogUspesnoComponent } from '../../../dialog/dialog-uspesno/dialog-uspesno.component'
import { DialogPotvrdaComponent } from '../../../dialog/dialog-potvrda/dialog-potvrda.component'
import { Router } from '@angular/router';

@Component({
  selector: 'app-izmena-podataka-korisnika',
  templateUrl: './izmena-podataka-korisnika.component.html',
  styleUrls: ['./izmena-podataka-korisnika.component.css']
})
export class IzmenaPodatakaKorisnikaComponent implements OnInit {

  constructor(private korisnikService: KorisnikService, private dialog: MatDialog, private router : Router) { }

  korisnik: any[];
  interesovanja: any[];
  greska: boolean = false;
  poruka: string = "";

  ngOnInit(): void {
    this.pronadjiKorisnika();
  }

  pronadjiKorisnika() {
    this.korisnik = this.korisnikService.pronadjiKorisnikaId();
    this.korisnik.forEach(k => {
      this.interesovanja = k.interesovanja
    });
  }

  pronadjiInteresovanja(interesovanje) : boolean {
    var b = false;
    this.interesovanja.forEach(i => {
      if(i == interesovanje) {
        b = true;
      }
    });

    return b;
  }

  cekiranoInteresovanje(interesovanje, isCekiran) {
    if(isCekiran) {
      this.interesovanja.push(interesovanje);
    } else {
        var indeks = this.interesovanja.findIndex(i => i == interesovanje);
        this.interesovanja.splice(indeks, 1);
    }
  }

  promeniPodatke(forma: NgForm) {
    var emailFromat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isEmail = emailFromat.test(String(forma.value.email));
            
    if(forma.value.ime != "" && forma.value.prezime != "" && forma.value.sifra != "" &&  forma.value.email && forma.value.telefon != "" && forma.value.adresa != "" && forma.value.grad != "" && this.interesovanja.length != 0 && forma.value.sifra.length >= 8 && isEmail) {
      if(this.korisnikService.izmenaPodataka(forma.value.ime, forma.value.prezime, forma.value.sifra, forma.value.email, forma.value.telefon, forma.value.adresa, forma.value.grad, this.interesovanja)) {
        this.dialog.open(DialogUspesnoComponent, {
          data: {
            poruka: "Uspešno ste promenili Vaše podatke."
          }
        });
      } else {
          this.greska = true;
          this.poruka = "Promena podataka nije uspela"
      }
    }  
  }

  obrisiNalog() {
    const poruka = this.dialog.open(DialogPotvrdaComponent, {
      data: {
        poruka: "Da li sigurno želite da obrišete nalog."
      }
    });
    poruka.afterClosed().subscribe(isObrisi => {
      if(isObrisi) {
        if(this.korisnikService.obrisiKorisnika()) {
          const obavestenje = this.dialog.open(DialogUspesnoComponent, {
            data: {
              poruka: "Uspešno ste obrisali nalog."
            }
          });

          obavestenje.afterClosed().subscribe(x => {
            this.router.navigate(['/prijava']);
          });
          
        } else {
            this.greska = true;
            this.poruka = "Brisanje naloga nije uspelo"   
        }
      }
    });
    
  }
}