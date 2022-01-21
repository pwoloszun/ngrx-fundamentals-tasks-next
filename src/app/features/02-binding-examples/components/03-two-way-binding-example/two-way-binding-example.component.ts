import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-two-way-binding-example',
  templateUrl: './two-way-binding-example.component.html',
  styleUrls: ['./two-way-binding-example.component.css']
})
export class TwoWayBindingExampleComponent implements OnInit {

  types = [
    'Private',
    'Public',
    'Top secret'
  ];

  message = {
    text: 'Imba!',
    type: this.types[0]
  };

  ngOnInit(): void {
  }

}
