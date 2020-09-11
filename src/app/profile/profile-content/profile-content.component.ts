import { BaseProfileContentService } from './../service/profile-content.service';
import { FieldMetadata } from './../../shared/model/common.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css'],
  providers: [BaseProfileContentService]
})
export class ProfileContentComponent implements OnInit {
  public personal: FormGroup;
  public personalFields: FieldMetadata[];


  public work: FormGroup;
  public workFields: FieldMetadata[];

  constructor(private baseProfileContentService: BaseProfileContentService) {}

  ngOnInit(): void {
    this.personalFields = this.baseProfileContentService.getPersonalFieldMeta();
    this.workFields = this.baseProfileContentService.getWorkFieldMeta();
  }

  saveProfile(event: any) {
    console.warn(event);
  }
}
