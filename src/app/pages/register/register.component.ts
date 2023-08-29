import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {



  rolesData: any[] = [];
  companiesData: any[] = [];

  isSubmit: boolean = false;
  errorFlag = false;
  errorMsg = '';
  isUpdateForm: boolean = false;
  showPassword: boolean = false;
  showRepeatedPassword: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('')]),
    email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('')]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)]),
    repeatedPassword: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl('', Validators.required),



  });

  get firstName() { return this.userForm.get('firstName') }
  get lastName() { return this.userForm.get('lastName') }
  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }
  get phoneNumber() { return this.userForm.get('phoneNumber') }



  ngOnInit() {

  }

  onSubmit() {

    this.isSubmit = true
    if (this.userForm.value.password != this.userForm.value.repeatedPassword) {
      this.errorFlag = true
      this.errorMsg = 'Passowrd and repeat password must be the same'

    } else {
      this.errorFlag = false
      this.errorMsg = ''
    }


    if (this.userForm.valid) {
      this.userService.registerUser(this.userForm.value).subscribe(
        {
          next() {

          },
          error: (e) => {
            console.log(e.error.message)
            this.errorFlag = true
            this.errorMsg = e.error.message
          },
          complete: () => {
            this.router.navigateByUrl('/login')
          },

        }
      );
    }
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatedPasswordVisibility() {
    this.showRepeatedPassword = !this.showRepeatedPassword;
  }

}
