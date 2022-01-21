import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Todo } from '@api/models/todos.models';

@Component({
  selector: 'nts-my-list-item-form',
  templateUrl: './my-list-item-form.component.html',
  styleUrls: ['./my-list-item-form.component.css']
})
export class MyListItemFormComponent implements OnChanges {

  @Input() item!: Todo;

  @Output() saveEdit = new EventEmitter<{ item: Todo, data: Partial<Todo> }>();
  @Output() cancelEdit = new EventEmitter<Todo>();

  title = '';
  description = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.title = this.item.title || '';
      this.description = this.item.description || '';
    }
  }

  handleSaveEdit(event: any) {
    event.preventDefault();
    const { item, title, description } = this;
    this.saveEdit.emit({
      item,
      data: { title, description } as any,
    });
  }

  handleCancelEdit(event: any) {
    event.preventDefault();
    this.cancelEdit.emit(this.item);
  }

}
