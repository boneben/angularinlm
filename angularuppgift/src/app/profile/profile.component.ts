import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { __await } from 'tslib';
import { User } from '../user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editForm: any;
  editingInfo: boolean = false;
  user: User;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.getInfo();
    this.isLoggedIn();

    this.editForm = this.formBuilder.group({
      'firstName': [''],
      'lastName': [''],
      'email': [''],
      'password': [''],
      'billingAddress': [''],
      'billingPostalNumber': [''],
      'billingCity': [''],
      'billingCountry': [''],
      'shippingAddress': [''],
      'shippingPostalNumber': [''],
      'shippingCity': [''],
      'shippingCountry': ['']
    })
  }

  isLoggedIn = () => {
    if( this.authService.isLoggedIn() ) {
      return true;
    } else {
      this.router.navigateByUrl("/");
      return false;
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn();
  }

  cancel() {
    this.getInfo()
    this.editingInfo = false;
  }

  getInfo() {
    this.authService.getUser()
      .subscribe((res => {
        this.user = res[0];
        const editForm = this.editForm.controls;
        editForm["firstName"].setValue(res[0].firstName);
        editForm["lastName"].setValue(res[0].lastName);
        editForm["email"].setValue(res[0].email);
        editForm["billingAddress"].setValue(res[0].billingAddress);
        editForm["billingPostalNumber"].setValue(res[0].billingPostalNumber);
        editForm["billingCity"].setValue(res[0].billingCity);
        editForm["billingCountry"].setValue(res[0].billingCountry);
        editForm["shippingAddress"].setValue(res[0].shippingAddress);
        editForm["shippingPostalNumber"].setValue(res[0].shippingPostalNumber);
        editForm["shippingCity"].setValue(res[0].shippingCity);
        editForm["shippingCountry"].setValue(res[0].shippingCountry);

        localStorage.setItem("USER_EMAIL", this.user["email"]);
      }))
    }

    updateInfo() {
      this.authService.updateUser(this.editForm.value).subscribe(data => {
        const values = Object.keys(data).map(key => data[key]);
        const success = values.join(",");

        if(success) {
          this.editingInfo = false;
          this.getInfo();
        }
      })
    }

}
