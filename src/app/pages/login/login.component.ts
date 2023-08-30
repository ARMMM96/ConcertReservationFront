import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl("",
      [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required],)
  })


  showPassword: boolean = false;

  isSubmit: boolean = false

  errorFlag = false
  errorMsg = ''

  userRoleId = ''

  constructor(private router: Router, protected user: UserService) { }

  get userEmail() { return this.loginForm.get('email') }
  get userPassword() { return this.loginForm.get('password') }
  get userData() { return this.loginForm.controls }

  handleLogin() {
    this.isSubmit = true
    if (this.loginForm.valid) {
      this.user.login(this.loginForm.value).subscribe(
        {
          next: (res) => {
            localStorage.setItem('token', res.data.token)
            this.user.isLogIn = true
          },
          error: (e) => {
            console.log(e)
            this.errorFlag = true
            if (e.status == 404) {
              this.errorMsg = `This Email is not exist in our web site`
            }
            if (e.status == 500) {
              this.errorMsg = `Something went wrong please make sure that you have written correct password`
            }
          },
          complete: () => this.router.navigateByUrl('/')
        }
      )
    }
  }

  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
