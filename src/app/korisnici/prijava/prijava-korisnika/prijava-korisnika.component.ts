import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KorisnikService } from '../../korisnik.service';
import { Router } from '@angular/router';
import { DialogGreskaComponent } from '../../../dialog/dialog-greska/dialog-greska.component'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-prijava-korisnika',
  templateUrl: './prijava-korisnika.component.html',
  styleUrls: ['./prijava-korisnika.component.css']
})
export class PrijavaKorisnikaComponent implements OnInit {
  greska: boolean = false;
  poruka: string;
  proba: string;

  constructor(private korisnikService: KorisnikService, private router : Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    localStorage.removeItem("korisnik_id")  
  }

  logovanje(form: NgForm) {
    if(!this.korisnikService.pronadjiKorisnikaUserName(form.value.kime)) {
      this.dialog.open(DialogGreskaComponent, {
        data: {
          poruka: "Korisnik sa unetim korisničkim imenom nije pronadjen."
        }
      });
    } else {
        if(!this.korisnikService.prijava(form.value.kime, form.value.sifra)){
          this.dialog.open(DialogGreskaComponent, {
            data: {
              poruka: "Uneta šifra nije ispravna."  
            },
          });
           
        } else {
            this.korisnikService.zapamtiKorisnika(form.value.kime);
            this.router.navigate(['/pretraga']);
        }
    }
  }
}