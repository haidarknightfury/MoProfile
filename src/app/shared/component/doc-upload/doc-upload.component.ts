import { DocUploadService } from './doc-upload.service';
import { formEntryAnimation } from './../../animation.shared';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.css'],
  animations: [formEntryAnimation],
  providers: [DocUploadService],
})
export class DocUploadComponent implements OnInit {
  @Input('heading')
  public subsectionHeading: string;

  @ViewChild('fileupload')
  fileupload: ElementRef;

  public imgSrc: string;

  constructor(private docUploadService: DocUploadService) {}

  ngOnInit(): void {}

  upload() {
    console.log('uploading file');
    let formdata = new FormData();
    formdata.set('file', this.fileupload.nativeElement.files[0]);
    this.docUploadService.uploadData(formdata).subscribe((event:HttpEvent<any>)=>{

      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request sent!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header received!');
          break;
        case HttpEventType.DownloadProgress:
          const kbLoaded = Math.round(event.loaded / 1024);
          console.log(`Download in progress! ${ kbLoaded }Kb loaded`);
          break;
        case HttpEventType.Response:
          console.log('😺 Done!', event.body);
      }
    }); 
  }

  onChanged(event: Event) {
    const file = this.fileupload.nativeElement.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imgSrc = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  removeSrc(){
    this.imgSrc = undefined;
  }
}
