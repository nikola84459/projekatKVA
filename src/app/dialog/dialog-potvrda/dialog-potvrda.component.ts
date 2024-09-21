import { Component, OnInit,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-potvrda',
  templateUrl: './dialog-potvrda.component.html',
  styleUrls: ['./dialog-potvrda.component.css']
})
export class DialogPotvrdaComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public podaci: any) { }

  ngOnInit(): void {
  }

}
