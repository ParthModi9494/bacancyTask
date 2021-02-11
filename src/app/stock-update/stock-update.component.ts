import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.scss']
})
export class StockUpdateComponent implements OnInit {
  stockStatus: string | null = null;
  stockValue: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  changeLabel() {
    if (!this.stockValue) {
      this.stockStatus = null;
      return;
    }
    const stock: number = Number(this.stockValue);
    if (stock <= 10) {
      this.stockStatus = "Low"
    } else if (stock > 10 && stock <= 20) {
      this.stockStatus = "Average"
    } else if (stock > 20) {
      this.stockStatus = "High"
    } else {
      this.stockStatus = null;
    }
  }


}
