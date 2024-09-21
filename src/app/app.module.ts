import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrijavaKorisnikaComponent } from './korisnici/prijava/prijava-korisnika/prijava-korisnika.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { PretragaComponent } from './mesta_za_relaksaciju/pronalazak_mesta/pretraga/pretraga.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { RezervacijeComponent } from './mesta_za_relaksaciju/rezervacije/rezervacije/rezervacije.component';
import { IstorijaComponent } from './mesta_za_relaksaciju/istorija/istorija/istorija.component';
import { NapraviRezervacijuComponent } from './mesta_za_relaksaciju/napraviRezervaciju/napravi-rezervaciju/napravi-rezervaciju.component';
import { DodavanjeNovogMestaComponent } from './mesta_za_relaksaciju/dodavanje_novog_mesta/dodavanje-novog-mesta/dodavanje-novog-mesta.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { IzmenaMestaComponent } from './mesta_za_relaksaciju/izmena_mesta/izmena-mesta/izmena-mesta.component';
import { IzmenaPodatakaMestaComponent } from './mesta_za_relaksaciju/izmena_podataka_mesta/izmena-podataka-mesta/izmena-podataka-mesta.component';
import { IzmenaPodatakaKorisnikaComponent } from './korisnici/izmena_podataka/izmena-podataka-korisnika/izmena-podataka-korisnika.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegistracijaKorisnikaComponent } from './korisnici/registracija_korisnika/registracija-korisnika/registracija-korisnika.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { DialogPotvrdaComponent } from './dialog/dialog-potvrda/dialog-potvrda.component';
import { DialogUspesnoComponent } from './dialog/dialog-uspesno/dialog-uspesno.component';
import { DialogGreskaComponent } from './dialog/dialog-greska/dialog-greska.component';
import { IzmenaRezervacijeComponent } from './mesta_za_relaksaciju/izmena-rezervacije/izmena-rezervacije.component';
import { MeniComponent } from './meni/meni/meni.component';






@NgModule({
  declarations: [
    AppComponent,
    PrijavaKorisnikaComponent,
    PretragaComponent,
    RezervacijeComponent,
    IstorijaComponent,
    NapraviRezervacijuComponent,
    DodavanjeNovogMestaComponent,
    IzmenaMestaComponent,
    IzmenaPodatakaMestaComponent,
    IzmenaPodatakaKorisnikaComponent,
    RegistracijaKorisnikaComponent,
    DialogGreskaComponent,
    DialogUspesnoComponent,
    DialogPotvrdaComponent,
    IzmenaRezervacijeComponent,
    MeniComponent,
    
  ],
  
  entryComponents:[DialogPotvrdaComponent, DialogUspesnoComponent, DialogGreskaComponent],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    NgxMatFileInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
