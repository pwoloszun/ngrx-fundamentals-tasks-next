import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'nts-pure-list',
  templateUrl: './pure-list.component.html',
  styleUrls: ['./pure-list.component.css']
})
export class PureListComponent<T> implements OnInit {

  @Input()
  items: any[] | null = [];

  @ContentChild(TemplateRef)
  itemTemplate!: TemplateRef<T>;

  ngOnInit(): void {
  }

}
