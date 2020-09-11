import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit {

  public profile: FormGroup;
  constructor() { }

  ngOnInit(): void {
    
  }

  saveProfile(){
    console.warn();
  }

}
