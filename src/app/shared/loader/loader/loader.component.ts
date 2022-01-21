import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nts-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() isLoading: boolean | null = false;

  ngOnInit() {
  }

}
