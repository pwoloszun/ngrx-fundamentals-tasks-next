import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { timer, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'nts-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {

  errorMessage$!: Observable<string>;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {
    const { message, duration } = this.data;
    const secondsLeft = Math.floor(duration / 1000);
    this.errorMessage$ = timer(0, 1000).pipe(
      take(secondsLeft),
      map((i) => `${message} (${secondsLeft - i})`)
    );
  }

}
