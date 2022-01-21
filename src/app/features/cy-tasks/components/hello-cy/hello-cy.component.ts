import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-hello-cy',
  templateUrl: './hello-cy.component.html',
  styleUrls: ['./hello-cy.component.css']
})
export class HelloCyComponent implements OnInit {

  messages = ['1st msg', '2nd msg', '3rd msg', '4th msg'];

  mutateMessageHandler(index: number) {
    this.messages[index] = `mutated: ${Math.random().toFixed(2)}`;
  }


  ngOnInit(): void {
  }

}
