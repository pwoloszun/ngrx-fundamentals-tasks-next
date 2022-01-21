import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { TODOS_DATA } from '../../fake-data/todos-data';

@Component({
  selector: 'nts-querying',
  templateUrl: './querying.component.html',
  styleUrls: ['./querying.component.css']
})
export class QueryingComponent implements OnInit {

  people = [
    { id: 123, name: 'batman' },
    { id: 22, name: 'bob' },
    { id: 33, name: 'ed' },
    { id: 44, name: 'kate' },
  ];
  private additionalPeople = [
    { id: 111, name: 'bart' },
    { id: 222, name: 'bruce' },
    { id: 333, name: 'ben' },
  ];

  todos$ = interval(1000).pipe(
    take(TODOS_DATA.length),
    map((i) => TODOS_DATA.slice(0, i + 1))
  );

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.people = this.people.concat(this.additionalPeople);
    }, 2000);
  }

}
