import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrijavaKorisnikaComponent } from  "./korisnici/prijava/prijava-korisnika/prijava-korisnika.component";
import { PretragaComponent } from './mesta_za_relaksaciju/pronalazak_mesta/pretraga/pretraga.component';
import { RezervacijeComponent } from './mesta_za_relaksaciju/rezervacije/rezervacije/rezervacije.component';
import { IstorijaComponent } from './mesta_za_relaksaciju/istorija/istorija/istorija.component';
import { NapraviRezervacijuComponent } from './mesta_za_relaksaciju/napraviRezervaciju/napravi-rezervaciju/napravi-rezervaciju.component';
import { DodavanjeNovogMestaComponent } from './mesta_za_relaksaciju/dodavanje_novog_mesta/dodavanje-novog-mesta/dodavanje-novog-mesta.component';
import { IzmenaMestaComponent } from './mesta_za_relaksaciju/izmena_mesta/izmena-mesta/izmena-mesta.component';
import { IzmenaPodatakaMestaComponent } from './mesta_za_relaksaciju/izmena_podataka_mesta/izmena-podataka-mesta/izmena-podataka-mesta.component';
import { IzmenaPodatakaKorisnikaComponent } from './korisnici/izmena_podataka/izmena-podataka-korisnika/izmena-podataka-korisnika.component';
import { RegistracijaKorisnikaComponent } from './korisnici/registracija_korisnika/registracija-korisnika/registracija-korisnika.component';
import { IzmenaRezervacijeComponent } from './mesta_za_relaksaciju/izmena-rezervacije/izmena-rezervacije.component';





const routes: Routes = [
  { path: '', redirectTo: "/prijava" ,pathMatch: 'full' },
  { path: 'prijava', component: PrijavaKorisnikaComponent },
  { path: 'pretraga', component: PretragaComponent},
  { path: 'rezervacije', component: RezervacijeComponent},
  { path: 'istorija', component: IstorijaComponent},
  { path: 'napraviRezervaciju/:id', component: NapraviRezervacijuComponent},
  { path: 'dodavanjeMesta', component: DodavanjeNovogMestaComponent},
  { path: 'izmena', component: IzmenaMestaComponent},
  { path: 'izmenaPodatakaMesta/:id', component: IzmenaPodatakaMestaComponent},
  { path: 'izmenaPodatakaKorisnika', component: IzmenaPodatakaKorisnikaComponent},
  { path: 'registracija', component: RegistracijaKorisnikaComponent},
  { path: 'izmenaRezervacije/:id', component: IzmenaRezervacijeComponent},  
]  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
