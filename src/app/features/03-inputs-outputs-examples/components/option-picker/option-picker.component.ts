import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

const defaultPrompt = 'Choose from:';

@Component({
  selector: 'nts-option-picker',
  templateUrl: './option-picker.component.html',
  styleUrls: ['./option-picker.component.css']
})
export class OptionPickerComponent implements OnInit {

  @Input() label!: string;
  @Input() options!: string[];
  @Output() optionSelect: EventEmitter<string> = new EventEmitter<string>();

  get headerText() {
    return this.label || defaultPrompt;
  }

  choose(option: string) {
    this.optionSelect.emit(option);
  }

  ngOnInit() {
  }
}
