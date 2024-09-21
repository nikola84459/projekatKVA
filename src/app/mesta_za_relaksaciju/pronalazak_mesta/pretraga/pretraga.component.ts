import { Component, OnInit } from '@angular/core';
import { MestaZaRelaksacijuPodaciService } from '../../mesta-za-relaksaciju-podaci.service';
import { NgForm } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {
  
  constructor(private mestaZaRelaksaciju: MestaZaRelaksacijuPodaciService, private dialog: MatDialog) { }

  dogadjaji : any[];
  greska : boolean = false;
  poruka : string = "";
  tip_aktivnosti: any[] = [];
  datum: string = "";
  vreme: string = "";
  pretraga: string = "";
 
  ngOnInit(): void {
    this.preporuciDogadjaj();  
  }
  
  preporuciDogadjaj() {
    this.dogadjaji = this.mestaZaRelaksaciju.preporuka();
  }

  pretraziDogadjaje(forma: NgForm) {
    this.dogadjaji = this.mestaZaRelaksaciju.pretrazi(forma.value.pretraga);
        
    if(this.dogadjaji.length == 0) {
      this.greska = true;
      this.poruka = "Nije pronadjen ni jedan dogadjaj.";  
    } else {
        this.greska = false;
        if(forma.value.pretraga == "") {
          this.dogadjaji = this.mestaZaRelaksaciju.preporuka();
        }
    } 
  }

  filterPretraga(forma: NgForm) {
    this.datum = forma.value.datum;  
    this.vreme = forma.value.vreme;
    this.filtriraj();      
    }
      
  postaviTip(tip, isCekiran) {
    if(isCekiran) {
      this.tip_aktivnosti.push(tip);
    } else {
        var indeks = this.tip_aktivnosti.findIndex(i => i == tip);
        this.tip_aktivnosti.splice(indeks, 1);
    }

    this.filtriraj();
  }

  filtriraj() {
      if(this.datum != "" || this.vreme != "" || this.tip_aktivnosti.length != 0){
        this.dogadjaji = this.mestaZaRelaksaciju.filtriraj(this.datum, this.vreme, this.tip_aktivnosti);
        if(this.dogadjaji.length == 0) {
          this.greska = true;
          this.poruka = "Nije pronadjen ni jedan dogadjaj.";    
        }
      } else {
          this.greska = false;
          this.dogadjaji = this.mestaZaRelaksaciju.preporuka();
      }
  }  
}