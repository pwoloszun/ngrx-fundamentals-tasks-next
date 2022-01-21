import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { FakerApiService } from '@api/faker-api.service';

import { TODOS_DATA } from '../../fake-data/todos-data';

@Component({
  selector: 'nts-adv-querying-tasks',
  templateUrl: './adv-querying-tasks.component.html',
  styleUrls: ['./adv-querying-tasks.component.css']
})
export class AdvQueryingTasksComponent implements OnInit {

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

  feeds$ = this.feedsApiService.allFeeds$;
  isLoading$ = this.feedsApiService.isLoading$;

  constructor(private feedsApiService: FakerApiService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.people = this.people.concat(this.additionalPeople);
    }, 2000);

    this.feedsApiService.loadFeeds(30);
  }

  onScrollHandler(): void {
    console.log('scrolled!!');
    this.feedsApiService.loadFeeds(10);
  }

}
