import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  OnSignIn(form:NgForm){
    console.log(form);
    const username = form.value.email;
    const password = form.value.password;
    //console.log("username"+username+","+"password"+password);
    this.authService.signin(username,password);
  }

}
