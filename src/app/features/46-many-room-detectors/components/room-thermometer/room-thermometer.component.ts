import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RoomDetector } from '@api/room-temperature-api.service';

@Component({
  selector: 'nts-room-thermometer',
  templateUrl: './room-thermometer.component.html',
  styleUrls: ['./room-thermometer.component.css']
})
export class RoomThermometerComponent {
  @Input() value!: RoomDetector;

  @Output() startMeasurement = new EventEmitter<number>();
  @Output() stopMeasurement = new EventEmitter<number>();

  get hasRisen(): boolean {
    const changeValue = this.tempChange;
    return changeValue !== null && changeValue > 0;
  }

  get hasDropped(): boolean {
    const changeValue = this.tempChange;
    return changeValue !== null && changeValue < 0;
  }

  get formattedChange(): string {
    const changeValue = this.tempChange;
    if (changeValue !== null) {
      let changeSign = '';
      if (changeValue > 0) {
        changeSign = '+';
      } else if (changeValue === 0) {
        changeSign = '=';
      }
      return changeSign + changeValue;
    } else {
      return '';
    }
  }

  private get tempChange(): number | null {
    const { temperatures } = this.value;
    const [currTemp, prevTemp] = temperatures;
    if (temperatures.length > 1) {
      return currTemp - prevTemp;
    } else {
      return null;
    }
  }
}
