import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-my-clock',
  templateUrl: './my-clock.component.html',
  styleUrls: ['./my-clock.component.css']
})
export class MyClockComponent implements OnInit {

  currentDt = new Date();

  ngOnInit(): void {
    setInterval(() => {
      this.currentDt = new Date();
    }, 1000);
  }

}
