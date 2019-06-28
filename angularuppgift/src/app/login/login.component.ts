import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  isSubmitted: boolean;
  incorrectCreds: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })

    if( this.authService.isLoggedIn() ) {
      this.router.navigateByUrl("/profile");
    }
  }

  login() {
    this.isSubmitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value)
      .subscribe((res) => {
        localStorage.setItem("ACCESS_TOKEN", res["token"]);
        localStorage.setItem("USER_ID", res["id"]);
        localStorage.setItem("USER_EMAIL", res["email"]);

        if(res["success"]) {
          this.router.navigateByUrl('/profile'); 
        }
      },(error) => {
        this.incorrectCreds = true;
      })  
    

  }


}
