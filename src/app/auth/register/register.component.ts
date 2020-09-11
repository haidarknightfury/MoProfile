import { formEntryAnimation } from './../../shared/animation.shared';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [formEntryAnimation]
})
export class RegisterComponent implements OnInit {
  
  @ViewChild('registerForm')
  private registerForm:NgForm;
  
  constructor() {}


  ngOnInit(): void {}

  register(): void {

  }
}
