import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { SliceState, selectors, actions } from '../../store';

@Component({
  selector: 'nts-new-message-dialog',
  templateUrl: './new-message-dialog.component.html',
  styleUrls: ['./new-message-dialog.component.css']
})
export class NewMessageDialogComponent implements OnInit {

  categories$ = this.store.pipe(
    select(selectors.selectCategories)
  );
  selectedCategoryId$ = this.categories$.pipe(
    map((categories) => categories.length > 0 ? categories[0].id : null)
  );

  titleTmp = '';
  selectedCategoryId!: number;

  get isFormValid() {
    return this.titleTmp.length > 0 && !!this.selectedCategoryId;
  }

  constructor(
    public dialogRef: MatDialogRef<NewMessageDialogComponent>,
    private store: Store<SliceState>
  ) { }

  createNewMessageHandler() {
    const dt = new Date();
    const action = actions.createMessageRequest({
      messageParams: {
        title: this.titleTmp,
        categoryId: this.selectedCategoryId,
        createdAt: dt.toJSON(),
      }
    });
    this.store.dispatch(action);
    this.closeDialog();
  }

  changeCategoryHandler(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }

  cancelHandler() {
    this.closeDialog();
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
