import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StockTypeDirective } from 'src/app/directives/stock-type.directive';
import { ProductSearchPipe } from 'src/app/pipes/product-search.pipe';
import { StockUpdateComponent } from '../stock-update/stock-update.component';
import { ProductListComponent } from './product-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];


@NgModule({
  declarations: [ProductListComponent, ProductSearchPipe, StockUpdateComponent, StockTypeDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [RouterModule]
})
export class ProductListModule { }
