import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface TodoFormData {
  title: string;
  description?: string;
}

@Component({
  selector: 'nts-my-todo-form',
  templateUrl: './my-todo-form.component.html',
  styleUrls: ['./my-todo-form.component.css']
})
export class MyTodoFormComponent implements OnInit {

  @Output() createItem = new EventEmitter<TodoFormData>();

  title = '';
  description = '';

  get isFormValid(): boolean {
    return this.title !== undefined && this.title.length > 0;
  }

  public onSubmit() {
    const { title, description } = this;
    this.createItem.emit({
      title,
      description
    });
    this.resetForm();
  }

  ngOnInit() {
    this.resetForm();
  }

  private resetForm() {
    this.title = '';
    this.description = '';
  }

}
