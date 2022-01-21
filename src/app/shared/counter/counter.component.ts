import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as dayjs from 'dayjs';

@Component({
  selector: 'nts-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  @Input() value: number | null = null;
  @Input() updatedAt: number | null = null;

  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  get formattedDate(): string {
    if (!this.updatedAt) {
      return '';
    }
    return dayjs(this.updatedAt).format('HH:mm:ss');
  }

  incrementHandler() {
    this.increment.emit();
  }

  decrementHandler() {
    this.decrement.emit();
  }

  resetHandler() {
    this.reset.emit();
  }
}
