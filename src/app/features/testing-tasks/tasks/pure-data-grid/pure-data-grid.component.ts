import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface MetaData {
  value: string;
  text: string;
}

interface DataTableItem {
  [key: string]: any;
}


@Component({
  selector: 'nts-pure-data-grid',
  templateUrl: './pure-data-grid.component.html',
  styleUrls: ['./pure-data-grid.component.css']
})
export class PureDataGridComponent<T extends DataTableItem> implements OnInit {

  @Input() items: T[] | null = [];
  @Input() selectedItem: T | null = null;
  @Input() metaData: MetaData[] = [];
  @Output() itemClick = new EventEmitter<T>();

  get displayedColumns() {
    return this.metaData.map((meta) => meta.value);
  }

  onRowClick(item: T) {
    this.itemClick.emit(item);
  }

  ngOnInit(): void {
  }

}
