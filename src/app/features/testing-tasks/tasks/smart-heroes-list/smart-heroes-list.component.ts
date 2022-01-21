import { Component, OnInit } from '@angular/core';

import { HeroesService } from '@api/hero.service';

@Component({
  selector: 'nts-smart-heroes-list',
  templateUrl: './smart-heroes-list.component.html',
  styleUrls: ['./smart-heroes-list.component.css']
})
export class SmartHeroesListComponent implements OnInit {

  readonly heroes$ = this.heroesService.getAll();

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

}
