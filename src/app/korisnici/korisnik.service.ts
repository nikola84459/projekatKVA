import { Injectable } from '@angular/core';


export interface Korisnik {
  id: number;
  ime: string;
  email: string;
  telefon: string;
  adresa: string;
  grad: string
  prezime: string;
  sifra: string;
  userName: string
  interesovanja: any;

}


@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor() { }

  static Korisnici: Array<Korisnik> = [
    {
      id: 1,
      ime: "Marko",
      prezime: "Markovic",
      email: "marko.markovic@gmail.com",
      telefon: "0652256987",
      adresa: "Adresa 1",
      grad: "Beograd",
      sifra: "12345",
      userName: "marko123",
      interesovanja: ["Sport", "Koncert"]
    },

    {
      id: 2,
      ime: "Petar",
      prezime: "Petrovic",
      email: "petar.pretrovic@gmail.com",
      telefon: "062547897",
      adresa: "Adresa 2",
      grad: "Novi Sad",
      sifra: "235689",
      userName: "pera123",
      interesovanja: ["Bioskop", "Sport"]
    },

    {
      id: 3,
      ime: "Jova",
      prezime: "Jovic",
      email: "jova.jovic@gmail.com",
      telefon: "0645496602",
      adresa: "Adresa 3",
      grad: "Beograd",
      sifra: "2378113",
      userName: "jova2525",
      interesovanja: ["Klub", "Koncert"]
    }
  ]

  pronadjiKorisnikaUserName(userName: string) : boolean {
    return KorisnikService.Korisnici.find(korisnik => korisnik.userName == userName) != undefined;
    
  }

  prijava(userName: string, sifra: string): boolean{
    return KorisnikService.Korisnici.find(korisnik => korisnik.userName == userName && korisnik.sifra == sifra) != undefined;  
  }
  
  zapamtiKorisnika(userName: string) {
    KorisnikService.Korisnici.forEach(korisnik => {
      if(korisnik.userName == userName) {
        localStorage.setItem("korisnik_id", JSON.stringify(korisnik.id));
        return;
      }
    });
  }

  pronadjiKorisnikaId() {
    return KorisnikService.Korisnici.filter(korisnik => {
      return korisnik.id == Number(localStorage.getItem("korisnik_id"))
    });
  }

  izmenaPodataka(ime, prezime, sifra, email, telefon, adresa, grad, interesovanja) : boolean {
    var greska = false;

    KorisnikService.Korisnici.forEach(korisnik => {
      if(korisnik.id == Number(localStorage.getItem("korisnik_id"))) {
        korisnik.ime = ime;
        korisnik.prezime = prezime;
        korisnik.email = email;
        korisnik.telefon = telefon;
        korisnik.adresa = adresa;
        korisnik.grad = grad;
        korisnik.sifra = sifra;
        korisnik.interesovanja = interesovanja
        
        greska = true;  
      }
    });

    return greska;
  }

  dodajKorisnika(ime, prezime, sifra, email, telefon, adresa, grad, kime, interesovanja) {
    var maxId: number = 0;
    KorisnikService.Korisnici.forEach(korisnik => {
      if (maxId < korisnik.id) {
        maxId = korisnik.id;
      }
    });
    var id =  ++maxId;
    var korisnik: Korisnik = {id: id, ime: ime, prezime: prezime, email: email, telefon: telefon, adresa: adresa, grad: grad, sifra: sifra, userName: kime, interesovanja: interesovanja};
    KorisnikService.Korisnici.push(korisnik);
    
  } 
  
  obrisiKorisnika() : boolean {
    var greska = false;

    KorisnikService.Korisnici.forEach((korisnik, index) => {
      if(korisnik.id == Number(localStorage.getItem("korisnik_id"))) {
        KorisnikService.Korisnici.splice(index, 1)
        greska = true;  
      }
    });

    
    return greska;
  }
}
