import { Component, OnInit,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-uspesno',
  templateUrl: './dialog-uspesno.component.html',
  styleUrls: ['./dialog-uspesno.component.css']
})
export class DialogUspesnoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public podaci: any) { }

  ngOnInit(): void {
  }

}
