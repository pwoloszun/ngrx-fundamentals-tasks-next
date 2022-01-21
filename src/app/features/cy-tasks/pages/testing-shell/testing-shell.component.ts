import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-testing-shell',
  templateUrl: './testing-shell.component.html',
  styleUrls: ['./testing-shell.component.css']
})
export class TestingShellComponent implements OnInit {

  links = [
    { text: 'Querying', path: 'querying' },
    { text: 'Assertions', path: 'assertions' },
    { text: 'Wait until', path: 'wait-until' },
    { text: 'Adv. Querying', path: 'adv-querying' },
  ];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit(): void {
  }

  changeActiveLinkHandler(link: any): void {
    this.activeLink = link;
  }
}
