import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {
  // filters the array based on the query provided
  transform(products: { docId: string, data: Product }[], ...args: string[]) {
    const searchQuery = args[0].toLowerCase();
    if (!products?.length || !args.length) {
      return null;
    }
    if (args[0] === "") {
      return products;
    }
    return products.filter((product) => {
      return (
        product.data.id?.toString().toLowerCase().includes(searchQuery) ||
        product.data.title.toLowerCase().includes(searchQuery) ||
        product.data.price.toString().toLowerCase().includes(searchQuery) ||
        product.data.stock.toString().toLowerCase().includes(searchQuery)
      );
    })
  }

}
