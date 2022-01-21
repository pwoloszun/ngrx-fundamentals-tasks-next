import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Todo } from '@api/models/todos.models';

@Component({
  selector: 'nts-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent<T extends Todo> {

  @Input() items: T[] | null = null;
  @Input() statuses: string[] | null = null;

  @Output() remove = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() saveEdit = new EventEmitter<{ item: T, data: Partial<T> }>();
  @Output() cancelEdit = new EventEmitter<T>();

  get allStatuses(): string[] {
    return this.statuses || [];
  }

  handleRemove(item: any) {
    this.remove.emit(item);
  }

  handleEdit(item: any) {
    this.edit.emit(item);
  }

  handleSaveEdit(params: any) {
    this.saveEdit.emit(params);
  }

  handleCancelEdit(item: any) {
    this.cancelEdit.emit(item);
  }
}
