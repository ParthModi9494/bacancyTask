import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  favourites: number = 0;
  cartItems: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
