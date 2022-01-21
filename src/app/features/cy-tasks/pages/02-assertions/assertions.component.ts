import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nts-assertions',
  templateUrl: './assertions.component.html',
  styleUrls: ['./assertions.component.css']
})
export class AssertionsComponent implements OnInit {

  clickedButton = '';

  constructor() { }

  ngOnInit(): void {
  }

  saveHandler() {
    this.clickedButton = 'save';
  }

  saveDraftHandler() {
    this.clickedButton = 'save draft';
  }

  cancelHandler() {
    this.clickedButton = 'cancel';
  }

  showOptionsHandler() {
    this.clickedButton = 'show options';
  }

  submitHandler() {
    // nothing - prevents default
  }
}
