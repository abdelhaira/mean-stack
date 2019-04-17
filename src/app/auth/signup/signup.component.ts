import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  passMatch = false;
  constructor(public authService : AuthService) { }

  ngOnInit() {
  }

  onSignup(form : NgForm){
    if(form.invalid){
      return;
    }
    if(form.value.confirmPassword != form.value.password){
      this.passMatch=false;
    }
    this.authService.createUser(form.value.email,form.value.password);
  }

  confirmPassword(password,confirmPassword){
    if(password === confirmPassword){
      this.passMatch=true;
    }else{
      this.passMatch=false;
    }
  }
}
