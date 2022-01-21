import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nts-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class MyCounterComponent implements OnInit {

  @Input() label!: string;
  @Input() value = 10;

  handleIncrementClick() {
    setTimeout(() => {
      this.value += 1;
    }, 1200);
  }

  ngOnInit() {
  }
}
