import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { MetaData } from './meta-data';

interface DataTableItem {
  [key: string]: any;
}

@Component({
  selector: 'nts-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent<T extends DataTableItem> {

  @Input() items: T[] | null = [];
  @Input() selectedItem: T | null = null;
  @Input() metaData!: MetaData[];
  @Output() itemClick = new EventEmitter<T>();

  onRowClick(item: T) {
    this.itemClick.emit(item);
  }

}
