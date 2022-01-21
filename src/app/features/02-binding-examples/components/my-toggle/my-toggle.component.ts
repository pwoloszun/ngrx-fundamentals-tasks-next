import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-my-toggle',
  templateUrl: './my-toggle.component.html',
  styleUrls: ['./my-toggle.component.css']
})
export class MyToggleComponent implements OnInit {

  isVisible = true;
  label = 'Toggle Hide';

  get toggleButtonCss() {
    return { 'mat-warn': !this.isVisible };
  }

  ngOnInit() {
  }

  toggleClickHandler() {
    this.isVisible = !this.isVisible;
    this.label = this.isVisible ? 'Toggle Hide' : 'Toggle Show';
  }

}
