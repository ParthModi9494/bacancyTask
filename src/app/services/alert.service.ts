import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // fires sweet alert modal
  showAlert(options: SweetAlertOptions) {
    return Swal.fire(options);
  }
}
