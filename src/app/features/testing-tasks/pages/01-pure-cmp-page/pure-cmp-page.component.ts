import { Component, OnInit } from '@angular/core';

import { RealEstatesApiService } from '@api/real-estates-api.service';

interface IProduct {
  id: number;
  text: string;
}

@Component({
  selector: 'nts-pure-cmp-page',
  templateUrl: './pure-cmp-page.component.html',
  styleUrls: ['./pure-cmp-page.component.css']
})
export class PureCmpPageComponent implements OnInit {

  labelText = 'Available Products';
  allProducts = [
    { id: 100, text: 'Petrol' },
    { id: 200, text: 'Car cosmetics' },
    { id: 300, text: 'Fast food' },
    { id: 400, text: 'Coffee' },
  ];
  selectedProduct?: IProduct = this.allProducts[1];

  realEsates$ = this.realEstatesApiService.getAll();
  estatesMeta = [
    { text: 'Street Addr.', value: 'street' },
    { text: 'Price ($)', value: 'price' },
    { text: 'Build Dt.', value: 'builtAt' },
  ];
  selectedRealEstate: any = null;

  constructor(private realEstatesApiService: RealEstatesApiService) { }

  selectProductHandler(product: IProduct) {
    if (this.selectedProduct?.id === product.id) {
      this.selectedProduct = undefined;
    } else {
      this.selectedProduct = product;
    }
  }

  selectReaclEstateHandler(estate: any) {
    this.selectedRealEstate = estate;
  }

  ngOnInit(): void {
  }

}
