import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://localhost:8081/docupload';

@Injectable()
export class DocUploadService {
  constructor(private httpClient: HttpClient) {}

  uploadData(data: any):Observable<any> {
    return this.httpClient.post<any>(URL, data, {reportProgress: true, observe:"events"});
  }
}
