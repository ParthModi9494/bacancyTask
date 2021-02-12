import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];
  productsRef = this.angularFireStore.collection("products");
  constructor(private angularFireStore: AngularFirestore) { }

  addProduct(product: Product) {
    return this.productsRef.add(product);
  }

  // fetch all the products from the firebase
  fetchProducts() {
    return this.angularFireStore.collection("products").snapshotChanges().pipe(
      map((data) => {
        return data.map((productDoc) => {
          const product = {
            docId: productDoc.payload.doc.id,
            data: productDoc.payload.doc.data() as Product
          }
          return product;
        })
      })
    );
  }

  // delete product based on the document Id
  deleteProduct(docId: string) {
    return this.productsRef.doc(docId).delete();
  }

  // updates the isAddedIntoCart property of the collection
  addOrRemoveCart(docId: string, isAddedIntoCart: boolean) {
    return this.productsRef.doc(`${docId}`).update({ isAddedIntoCart });
  }

  // updates the isFavourite property of the collection
  addOrRemoveFavourite(docId: string, isFavourite: boolean) {
    return this.productsRef.doc(`${docId}`).update({ isFavourite });
  }

  // updates the product data
  editProduct(docId: string, productDataToUpdate: Product) {
    return this.productsRef.doc(`${docId}`).update(productDataToUpdate);
  }
}
