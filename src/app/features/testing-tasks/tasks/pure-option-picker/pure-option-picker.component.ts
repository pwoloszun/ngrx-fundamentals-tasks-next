import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface IItem {
  id: number;
  text: string;
}

@Component({
  selector: 'nts-pure-option-picker',
  templateUrl: './pure-option-picker.component.html',
  styleUrls: ['./pure-option-picker.component.css']
})
export class PureOptionPickerComponent<T extends IItem> implements OnInit {

  @Input() title!: string;
  @Input() items!: T[];
  @Input() selectedItem?: T;
  @Output() itemSelect = new EventEmitter<IItem>();

  buttonClickHandler(item: T) {
    this.itemSelect.emit(item);
  }

  ngOnInit(): void {
  }

}
