import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nts-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() text!: string;
  @Output() messageSent: EventEmitter<string> = new EventEmitter<string>();

  childText = '';

  sendMessage() {
    this.messageSent.emit(this.childText);
  }

  ngOnInit() {
  }
}
