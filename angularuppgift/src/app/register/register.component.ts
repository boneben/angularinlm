import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any;
  isSubmitted: boolean = false;
  error: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'birthDate': ['', Validators.required],
      'billingAddress': ['', Validators.required],
      'billingPostalNumber': ['', Validators.required],
      'billingCity': ['', Validators.required],
      'billingCountry': ['', Validators.required],
      'shippingAddress': ['', Validators.required],
      'shippingPostalNumber': ['', Validators.required],
      'shippingCity': ['', Validators.required],
      'shippingCountry': ['', Validators.required]
    })

    if( this.authService.isLoggedIn() ) {
      this.router.navigateByUrl("/profile");
    }
  }

  register() {
    this.isSubmitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value).subscribe((registerres) => {
      if(registerres["Success!"]) {
            this.router.navigateByUrl('/');  
      } else {
        return;
      }
    })
  }

  cloneBillingAddress() {
    //Checkbox for address
    var isChecked = (<HTMLInputElement>document.getElementById("same")).checked;
    const regForm = this.registerForm.controls;

    if( isChecked ) {
      regForm['shippingAddress'].setValue(regForm['billingAddress'].value);
      regForm['shippingPostalNumber'].setValue(regForm['billingPostalNumber'].value);
      regForm['shippingCity'].setValue(regForm['billingCity'].value);
      regForm['shippingCountry'].setValue(regForm['billingCountry'].value);
    } else {
      regForm['shippingAddress'].setValue("");
      regForm['shippingPostalNumber'].setValue("");
      regForm['shippingCity'].setValue("");
      regForm['shippingCountry'].setValue("");
    }
  }

}
