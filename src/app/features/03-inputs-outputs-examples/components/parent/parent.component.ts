import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  parentMsg = '';

  logMessage(message: string) {
    console.log('received from Child', message);
  }

  ngOnInit() {
  }
}
