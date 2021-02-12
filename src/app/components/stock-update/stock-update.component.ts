import { Component, OnInit } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-stock-update',
  templateUrl: './stock-update.component.html',
  styleUrls: ['./stock-update.component.scss']
})
export class StockUpdateComponent implements OnInit {
  stockStatus: string | null = null;
  stockValue: string = "";
  APP_CONSTANTS = APP_CONSTANTS;
  constructor() { }

  ngOnInit(): void {
  }

  // change the label and color based on predefined conditions
  changeLabel() {
    if (!this.stockValue) {
      this.stockStatus = null;
      return;
    }
    const stock: number = Number(this.stockValue);
    if (stock <= 10) {
      this.stockStatus = APP_CONSTANTS.LABEL_LOW;
    } else if (stock > 10 && stock <= 20) {
      this.stockStatus = APP_CONSTANTS.LABEL_AVERAGE;
    } else if (stock > 20) {
      this.stockStatus = APP_CONSTANTS.LABEL_HIGH;
    } else {
      this.stockStatus = null;
    }
  }


}
