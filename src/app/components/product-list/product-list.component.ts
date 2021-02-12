import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertOptions } from 'sweetalert2';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  totalFavourites: number = 0;
  totalCartItems: number = 0;
  searchQuery: string = "";
  isShowingFavourite: boolean = false;
  isShowingCart: boolean = false;
  page: number = 2;
  pageSize = 10;
  products: { docId: string, data: Product }[] = [];
  addOREditProductForm: FormGroup;
  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
    this.addOREditProductForm = this.formBuilder.group({
      "title": ["", Validators.required],
      "price": ["", Validators.required],
      "stock": ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.getProducts();
  }

  // fetch all the products from the database
  getProducts() {
    this.productsService.fetchProducts().subscribe((docData) => {
      this.products = docData;
      const favourites = this.products.filter((product) => {
        return product.data.isFavourite;
      });
      this.totalFavourites = favourites ? favourites.length : 0;

      const cartItems = this.products.filter((product) => {
        return product.data.isAddedIntoCart;
      });
      this.totalCartItems = cartItems ? cartItems.length : 0;
    }, (err: HttpErrorResponse) => {
      this.products = [];
    });
  }

  // delete product from the database
  deleteProduct(docId: string) {
    const options: SweetAlertOptions = {
      title: "Are you sure?",
      text: "You want to delete this product?",
      icon: "warning",
      showDenyButton: true,
      showConfirmButton: true
    };
    this.alertService.showAlert(options).then((selection) => {
      if (selection.isConfirmed) {
        this.productsService.deleteProduct(docId).then((data) => {
          this.alertService.showAlert({ title: "Success", icon: "success", timer: 2000 });
        }).catch(() => {
          this.alertService.showAlert({ title: "Error!", icon: "error", timer: 2000 });
        });
      }
    });
  }

  // add new product into database
  addProduct() {
    const newProduct: Product = {
      id: this.products.length + 1,
      isAddedIntoCart: false,
      isFavourite: false,
      price: this.addOREditProductForm.value.price,
      stock: this.addOREditProductForm.value.stock,
      title: this.addOREditProductForm.value.title
    };
    if (newProduct.title.length > 0 && newProduct.price && newProduct.stock) {
      this.productsService.addProduct(newProduct).then(() => {
        this.alertService.showAlert({ title: "Success", text: "Product successfully added!", icon: "success", timer: 2000 });
      });
    } else {
      this.alertService.showAlert({ title: "Please provide valid details!", icon: "error", timer: 2000 });
    }
  }

  // edit the existing product data
  editProduct(docId: string) {
    const productToUpdate: Product = {
      price: this.addOREditProductForm.value.price,
      stock: this.addOREditProductForm.value.stock,
      title: this.addOREditProductForm.value.title
    };
    if (productToUpdate.title.length > 0 && productToUpdate.price && productToUpdate.stock) {
      this.productsService.editProduct(docId, productToUpdate).then(() => {
        this.alertService.showAlert({ title: "Success", text: "Product data successfully updated!", icon: "success", timer: 2000 });
      });
    } else {
      this.alertService.showAlert({ title: "Please provide valid details!", icon: "error", timer: 2000 });
    }
  }

  // to add or remove the cart from the Carts
  addOrRemoveCart(docId: string, productData: Product) {
    this.productsService.addOrRemoveCart(docId, !productData.isAddedIntoCart).then((data) => {
      if (productData.isAddedIntoCart) {
        this.alertService.showAlert({ title: "Success", text: "Product successfully removed from Cart!", icon: "success", timer: 2000 });
      } else {
        this.alertService.showAlert({ title: "Success", text: "Product successfully added into Cart!", icon: "success", timer: 2000 });
      }
    }).catch((err) => {
      this.alertService.showAlert({ title: "Error!", icon: "error", timer: 2000 });
    });
  }

  // to add or remove the products from favourites
  addOrRemoveFavourite(docId: string, productData: Product) {
    this.productsService.addOrRemoveFavourite(docId, !productData.isFavourite).then((data) => {
      if (productData.isFavourite) {
        this.alertService.showAlert({ title: "Success", text: "Product removed from Favourites!", icon: "success", timer: 2000 });
      } else {
        this.alertService.showAlert({ title: "Success", text: "Product marked as Favourite!", icon: "success", timer: 2000 });
      }
    }).catch((err) => {
      this.alertService.showAlert({ title: "Error!", icon: "error", timer: 2000 });
    });
  }

  logout() {
    this.authService.logout();
  }

  // set the form values as per the user action to add or edit the product
  addOrEditProduct(content: TemplateRef<HTMLElement>, product?: { docId: string, data: Product }) {
    this.addOREditProductForm.patchValue({
      title: product ? product.data.title : "",
      price: product ? product.data.price : "",
      stock: product ? product.data.stock : ""
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(() => {
      product ? this.editProduct(product.docId) : this.addProduct();
    }, (reason) => { });
  }

  // filter the favourites products
  getFavourites() {
    if (this.isShowingFavourite) {
      this.getProducts();
    } else {
      this.products = this.products.filter((product) => {
        return product.data.isFavourite;
      })
    }
    this.isShowingFavourite = !this.isShowingFavourite;
  }

  // filter carts products
  getCartItems() {
    if (this.isShowingCart) {
      this.getProducts();
    } else {
      this.products = this.products.filter((product) => {
        return product.data.isAddedIntoCart;
      })
    }
    this.isShowingCart = !this.isShowingCart;
  }
}
