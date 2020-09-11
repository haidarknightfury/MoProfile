import { AuthState } from './../store/auth.reducer';
import { formEntryAnimation } from './../../shared/animation.shared';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromAuth from './../store/auth.action'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [formEntryAnimation],
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm')
  private loginForm: NgForm;

  authState: Observable<AuthState>;

  constructor(private store: Store<{ auth: AuthState }>) {}

  ngOnInit(): void {
     this.authState =  this.store.select('auth');
  }

  login(): void {
    console.log(this.loginForm.value);
    this.store.dispatch(new fromAuth.Login('123456'))
  }
}
