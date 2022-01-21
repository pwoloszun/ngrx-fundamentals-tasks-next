import { Component, OnInit } from '@angular/core';
import { randomBetween } from '../../../../utils/index';

@Component({
  selector: 'nts-wait-until',
  templateUrl: './wait-until.component.html',
  styleUrls: ['./wait-until.component.css']
})
export class WaitUntilComponent implements OnInit {

  squareStyles = {};
  message = '';

  ngOnInit(): void {
    setTimeout(() => {
      this.squareStyles = {
        width: '600px',
        height: '600px',
        backgroundColor: '#f00',
      };
      this.message = `imba ${Math.random()}`;
    }, randomBetween(2, 5) * 1000);
  }

}
