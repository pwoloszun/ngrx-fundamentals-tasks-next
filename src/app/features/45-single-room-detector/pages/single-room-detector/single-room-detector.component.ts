import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'nts-single-room-detector',
  templateUrl: './single-room-detector.component.html',
  styleUrls: ['./single-room-detector.component.css']
})
export class SingleRoomDetectorComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
