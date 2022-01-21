import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-testing-context-menu',
  templateUrl: './testing-context-menu.component.html',
  styleUrls: ['./testing-context-menu.component.css']
})
export class TestingContextMenuComponent implements OnInit {

  links = [
    { path: 'pure-components', text: 'Pure Cmp' },
    { path: 'smart-components', text: 'Smart Cmp' },
    { path: 'services', text: 'Services' },

    { path: 'directives', text: 'Directives' },
    { path: 'pipes', text: 'Pipes' },
    { path: 'reactive-forms', text: 'Reactive Forms' },

  ];

  ngOnInit(): void {
  }

}
