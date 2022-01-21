import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-message-filter-list',
  templateUrl: './message-filter-list.component.html',
  styleUrls: ['./message-filter-list.component.css']
})
export class MessageFilterListComponent implements OnInit {

  messageFilters: any = [
    { id: 100, value: 'received', text: 'Received' },
    { id: 200, value: 'drafts', text: 'Drafts' },
    { id: 300, value: 'starred', text: 'Starred' },
  ];
  selectedMessageFilter = this.messageFilters[0];

  constructor() { }

  selectFilterHandler(filter: any) {
    this.selectedMessageFilter = filter;
  }

  ngOnInit() {
  }

}
