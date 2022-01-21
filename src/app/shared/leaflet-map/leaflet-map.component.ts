import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { MapViewModel } from './viewmodels/map.vm';
import { LatLng } from './viewmodels/lat-lng.interface';
import { OnChanges, SimpleChanges } from '@angular/core';
import { MarkerViewModel } from './viewmodels/marker.vm';

@Component({
  selector: 'nts-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent<T extends LatLng> implements AfterViewInit, OnChanges {

  @Input() selected: T | null = null;
  @Input() geoObjects: T[] | null = [];
  @Output() markerClick = new EventEmitter<T>();

  @ViewChild('mapCont')
  private mapContainer?: ElementRef;
  private map?: MapViewModel;
  private gMarkers: MarkerViewModel[] = [];

  ngAfterViewInit(): void {
    const el = this.mapContainer?.nativeElement;
    this.map = new MapViewModel(el);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selected) {
      this.highlightSelected();
    } else if (changes.geoObjects) {
      this.renderMarkers();
    }
  }

  private renderMarkers() {
    if (!this.map || !this.geoObjects) {
      return;
    }
    const map = this.map as MapViewModel;
    this.gMarkers = this.geoObjects.map((marker) => {
      const gMarker = map.createMarker(marker);
      gMarker.on('click', (obj) => {
        this.markerClick.emit(obj as T);
        // this.appRef.tick();
      });
      return gMarker;
    });
    this.highlightSelected();
  }

  private highlightSelected() {
    this.gMarkers.forEach((gMarker) => {
      const isHighlighted = gMarker.matches(this.selected);
      gMarker.setHighlight(isHighlighted);
    });
  }
}
