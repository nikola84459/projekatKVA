import { Component, OnInit,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-greska',
  templateUrl: './dialog-greska.component.html',
  styleUrls: ['./dialog-greska.component.css']
})
export class DialogGreskaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public podaci: any) { }

  ngOnInit(): void {
  }

}
