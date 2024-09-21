import { ParseTreeResult } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { KorisnikService, Korisnik } from './../korisnici/korisnik.service';

interface Dogadjaj {
  id: number;
  naziv: string;
  opis: string;
  lokacija: string;
  grad: string;
  tip_aktivnosti: string;
  korisniciId: any[];
  datum: string;
  vreme: string;
  trajanje: string;
  komentari: any[];
  slobodna_mesta: number;
  dogadjaj_korisnik: number;
  status: "Rezervisan" | "Završen" | "Otkazan" | "Dostupan";
  slika: string; 
}

@Injectable({
  providedIn: 'root'
})
export class MestaZaRelaksacijuPodaciService {

  constructor() { }

  static Dogadjaji: Array<Dogadjaj> = [
    {
      id: 1,
      naziv: "Dogadjaj 1",
      opis: "Opis dogadjaja 1",
      lokacija: "Štark arena",
      grad: "Beograd",
      tip_aktivnosti: "Koncert",
      korisniciId: [{id:1, brojOsoba: 5}, {id:2, brojOsoba: 2}],
      datum: "2020-12-15",
      vreme: "15:20",
      trajanje: "120 min",
      komentari: [{korisnikId: 1, komentar: "nesto"}],
      slobodna_mesta: 20000,
      dogadjaj_korisnik: null,
      status: "Dostupan",
      slika: "http://localhost:4200/assets/slikaProjekat.jpg"  
    },

    {
      id: 2,
      naziv: "Dogadjaj 2",
      opis: "Opis dogadjaja 2",
      lokacija: "Štark arena",
      grad: "Beograd",
      tip_aktivnosti: "Koncert",
      korisniciId: [{id:2, brojOsoba: 2}],
      datum: "2020-12-16",
      vreme: "20:00",
      trajanje: "140 min",
      komentari: [],
      slobodna_mesta: 10000,
      dogadjaj_korisnik: 1,
      status: "Dostupan",
      slika: "http://localhost:4200/assets/slikaProjekat.jpg"  
    },

    {
      id: 3,
      naziv: "Dogadjaj 3",
      opis: "Opis dogadjaja 3",
      lokacija: "Bioskop",
      grad: "Beograd",
      tip_aktivnosti: "Film",
      korisniciId: [{id:1, brojOsoba: 5}, {id:3, brojOsoba: 2}],
      datum: "2020-12-05",
      vreme: "23:05",
      trajanje: "100 min",
      status: "Završen",
      komentari: [{korisnikId:3, komentar: "Nesto"}],
      slobodna_mesta: 1000,
      dogadjaj_korisnik: 2,
      slika: "http://localhost:4200/assets/slikaProjekat.jpg"  
    },

    {
      id: 4,
      naziv: "Dogadjaj 4",
      opis: "Opis dogadjaja 4",
      lokacija: "Bioskop",
      grad: "Beograd",
      tip_aktivnosti: "Film",
      korisniciId: [{id:3, brojOsoba: 4}, {id:2, brojOsoba: 1}],
      datum: "2020-12-06",
      vreme: "23:05",
      trajanje: "100 min",
      status: "Rezervisan",
      komentari: [],
      slobodna_mesta: 200,
      dogadjaj_korisnik: null,
      slika: "http://localhost:4200/assets/slikaProjekat.jpg"  
    },

    {
      id: 5,
      naziv: "Dogadjaj 5",
      opis: "Opis dogadjaja 5",
      lokacija: "Marakana",
      grad: "Beograd",
      tip_aktivnosti: "Sport",
      korisniciId: [{id:1, brojOsoba: 5}, {id:2, brojOsoba: 2}],
      datum: "2020-12-12",
      vreme: "20:15",
      trajanje: "90 min",
      status: "Završen",
      komentari: [],
      slobodna_mesta: 10000,
      dogadjaj_korisnik: 1,
      slika: "http://localhost:4200/assets/slikaProjekat.jpg"  
    }
  ];

  preporuka() {
    var lokacija = "Beograd";
    var interesovanja = [];
    KorisnikService.Korisnici.forEach(korisnik => {
      if(korisnik.id == Number(localStorage.getItem("korisnik_id"))) {
        interesovanja = korisnik.interesovanja;
      }
    });
    var dogadjaj = MestaZaRelaksacijuPodaciService.Dogadjaji.filter(dogadjaj => {
      return dogadjaj.grad == lokacija  && dogadjaj.status == "Dostupan" && interesovanja.includes(dogadjaj.tip_aktivnosti) && !dogadjaj.korisniciId.some(korisnik => {
        return korisnik.id == Number(localStorage.getItem("korisnik_id"))
      });
    });
    
    return dogadjaj;
  }

  pretraziRezervisane() {
    var dogadjaj = MestaZaRelaksacijuPodaciService.Dogadjaji.filter(dogadjaj => {
      return dogadjaj.korisniciId.some(korisnik => korisnik.id == Number(localStorage.getItem("korisnik_id"))) && dogadjaj.status != "Završen"
    });
    
    return dogadjaj;
  }  

  pretraziIstorija() {
    var dogadjaj = MestaZaRelaksacijuPodaciService.Dogadjaji.filter(dogadjaj => {
      return dogadjaj.status == "Završen" && dogadjaj.korisniciId.some(korisnik => korisnik.id == Number(localStorage.getItem("korisnik_id")))
    });
    
    dogadjaj.forEach(podatak => {
      podatak.komentari.forEach(komentar => {
        if(komentar.korisnikId == Number(localStorage.getItem("korisnik_id"))) {
          podatak.komentari = komentar.komentar;
        } else {
            podatak.komentari = [];
        }
      });
    });
    
    return dogadjaj;
  }
  
  pretraziPoId(id: number) {
    var dogadjaj = MestaZaRelaksacijuPodaciService.Dogadjaji.filter(dogadjaj => {
      return dogadjaj.id == id
    });
    return dogadjaj;
  }

  dodajKomentar(id: number, komentar: string): boolean {
     var greska: boolean = false;
      MestaZaRelaksacijuPodaciService.Dogadjaji.forEach(dogadjaj => {
        if(dogadjaj.id == id) {
          var podatak = {korisnikId: Number(localStorage.getItem("korisnik_id")), komentar: komentar};
          dogadjaj.komentari.push(podatak);
          greska = true;    
        }
      });

             
    return greska;
  }
  
  obrisiRezervaciju(id: number): boolean {
    var greska: boolean = false;
    MestaZaRelaksacijuPodaciService.Dogadjaji.filter(dogadjaj => {
			return dogadjaj.id == id && dogadjaj.korisniciId.some((korisnik, index) =>  {
				if(korisnik.id == Number(localStorage.getItem("korisnik_id"))) {
          dogadjaj.korisniciId.splice(index, 1)
          greska = true;
        }
			});
		})
    
    return greska
  }

  napraviRezervaciju(id: number, brojOsoba: number): boolean {
    var greska: boolean = false;
    
    MestaZaRelaksacijuPodaciService.Dogadjaji.forEach(dogadjaj => {
      if(dogadjaj.id == id) {
        if(dogadjaj.slobodna_mesta >= brojOsoba) {
          dogadjaj.slobodna_mesta = dogadjaj.slobodna_mesta - brojOsoba;
          var podatak = {id: Number(localStorage.getItem("korisnik_id")), brojOsoba: brojOsoba}
          dogadjaj.korisniciId.push(podatak);
          if(dogadjaj.slobodna_mesta == 0) {
            dogadjaj.status = "Rezervisan";
          }
        } else {
            greska = true;
        }
      }
    });

    return greska;
  }

  dodajDogadjaj(naziv: string, opis: string, lokacija: string, datum: string, vreme: string, trajanje: string, tip_aktivnosti: string, slika: string, grad: string, slobodnaMesta: number){
    var maxId: number = 0;
    MestaZaRelaksacijuPodaciService.Dogadjaji.forEach(dogadjaj => {
      if (maxId < dogadjaj.id) {
        maxId = dogadjaj.id;
      }
    });
    var id =  ++maxId;
    var dogadjaj: Dogadjaj = {id: id, naziv: naziv, opis: opis, lokacija: lokacija, grad: grad, tip_aktivnosti: tip_aktivnosti, korisniciId:[], datum: datum, vreme: vreme, trajanje: trajanje + " min", status: "Dostupan", komentari:[], slobodna_mesta: slobodnaMesta, dogadjaj_korisnik: Number(localStorage.getItem("korisnik_id")), slika: "http://localhost:4200/assets/" + slika};
    MestaZaRelaksacijuPodaciService.Dogadjaji.push(dogadjaj);
  }

  dogadjajiZaIzmenu() {
    var dogadjaji = MestaZaRelaksacijuPodaciService.Dogadjaji.filter(dogadjaj => {
      return dogadjaj.dogadjaj_korisnik == Number(localStorage.getItem("korisnik_id"));
    });

    return dogadjaji;
  }

  obrisiDogadjaj(id) : boolean {
    var greska = false;

    MestaZaRelaksacijuPodaciService.Dogadjaji.forEach((dogadjaj, index) => {
      if(id == dogadjaj.id) {
        MestaZaRelaksacijuPodaciService.Dogadjaji.splice(index, 1);
        greska = true;
      }
    });

    return greska;
  }

  izmenaPodataka(naziv, opis, lokacija, datum, vreme, trajanje, tip_aktivnosti, id, slika, grad, slobodna_mesta) : boolean {
    var greska = false;

    MestaZaRelaksacijuPodaciService.Dogadjaji.forEach(dogadjaj => {
      if(id == dogadjaj.id) {
        dogadjaj.naziv = naziv;
        dogadjaj.opis = opis;
        dogadjaj.lokacija = lokacija;
        dogadjaj.datum = datum;
        dogadjaj.vreme = vreme;
        dogadjaj.trajanje = trajanje;
        dogadjaj.tip_aktivnosti = tip_aktivnosti;
        var postaviSliku = ""; 
        if(slika == "") {
          postaviSliku = dogadjaj.slika;
        } else {
            postaviSliku = "http://localhost:4200/assets/" + slika;
        }
        dogadjaj.slika = postaviSliku;
        dogadjaj.grad = grad;
        dogadjaj.slobodna_mesta = slobodna_mesta;
        var trenutniDatum = new Date();
        var unetiDatum = new Date(datum);
        if(dogadjaj.status == "Završen") {  
          if(unetiDatum > trenutniDatum) {
            dogadjaj.status = "Dostupan"
            dogadjaj.korisniciId = [];
          }
        }  
        
        greska = true
      }
    });

    return greska;
  }

  pretrazi(pojamZaPretragu) {
    var dogadjaj = MestaZaRelaksacijuPodaciService.Dogadjaji.filter(dogadjaj => {
      return (dogadjaj.naziv.toLowerCase().includes(pojamZaPretragu.toLowerCase()) || dogadjaj.lokacija.toLowerCase().includes(pojamZaPretragu.toLowerCase())) && !dogadjaj.korisniciId.some(korisnik => {
        return korisnik.id == Number(localStorage.getItem("korisnik_id"))
      });
    });  
    
    
    return dogadjaj;
  }

  filtriraj(datum, vreme, tip_aktivnosti: any[]) {
    return MestaZaRelaksacijuPodaciService.Dogadjaji.filter(dogadjaj => {
      return (dogadjaj.datum == datum || datum == "") && (dogadjaj.vreme == vreme || vreme == "")  && (tip_aktivnosti.includes(dogadjaj.tip_aktivnosti) || tip_aktivnosti.length == 0) && dogadjaj.status != "Završen" && !dogadjaj.korisniciId.some(korisnik => {
        return korisnik.id == Number(localStorage.getItem("korisnik_id")); 
      });  
  });
} 

  otkazi(id): boolean {
    var greska = false;

    MestaZaRelaksacijuPodaciService.Dogadjaji.forEach(dogadjaj => {
      if(dogadjaj.id == id) {
        dogadjaj.status = "Otkazan";
        greska = true;
      }
    });

    return greska;
  }

  postaviKaoDostupan(id): boolean {
    var greska = false;

    MestaZaRelaksacijuPodaciService.Dogadjaji.forEach(dogadjaj => {
      if(dogadjaj.id == id) {
        dogadjaj.status = "Dostupan";
        greska = true;
      }
    });

    return greska;
  }

  vratiBrojOsoba(id): number{
    var brojOsoba = 0;
     MestaZaRelaksacijuPodaciService.Dogadjaji.forEach(dogadjaj => {
        if(dogadjaj.id == id) {
          dogadjaj.korisniciId.forEach(korisnikId => {
            if(korisnikId.id == Number(localStorage.getItem("korisnik_id"))) {
              brojOsoba = korisnikId.brojOsoba;
            }
          });
        }
     });

     return brojOsoba;
  }

  izmenaRezervacije(id, brojOsoba) : boolean {
    var izmena = false;

    MestaZaRelaksacijuPodaciService.Dogadjaji.forEach(dogadjaj => {
      if(id == dogadjaj.id) {
        dogadjaj.korisniciId.forEach(broj => {
          if(broj.id == Number(localStorage.getItem("korisnik_id"))){
            if (brojOsoba <= broj.brojOsoba) {
              var mesta = broj.brojOsoba - brojOsoba;
              broj.brojOsoba = brojOsoba
              dogadjaj.slobodna_mesta = dogadjaj.slobodna_mesta + mesta;
            } else {
                if(dogadjaj.slobodna_mesta >= brojOsoba) {
                  broj.brojOsoba = brojOsoba;
                  dogadjaj.slobodna_mesta = dogadjaj.slobodna_mesta - brojOsoba;
                } else {
                    izmena = true;           
              }
            } 
          }  
        });
      }
    });
    
   return izmena;
  }
}