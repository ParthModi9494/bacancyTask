import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Using existing credentials as we can't register with new credentials in reqres api
    this.loginForm = this.formBuilder.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['pistol', Validators.required]
    });
  }
  ngOnInit() {
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.login();
  }

  login() {
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((loginRes: LoginResponse) => {
      this.isLoading = false;
      this.router.navigateByUrl('products');
    })
  }
}
