import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../app.config';
import { URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';


@Injectable()
export class fileUploadService {
    apiUrl: string;
    constructor(
            private http: HttpClient, 
            private config: AppConfig
        ) { }

    postFile(fileToUpload: File, orderId: string,docType:string, refnumber: string, movenumber: number,linehaul: string, acc: Array<any>){  //:Observable<Invoices[]> 
        const formData: FormData = new FormData();
        formData.append('filekey',fileToUpload,fileToUpload.name);
        formData.append('Linehaul', linehaul);
        for (let entry of acc){
            formData.append(entry.type,entry.accessorial)
        }
        const httpOptions = {
            headers: new HttpHeaders({
            //   'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };

        this.apiUrl = this.config.apiUrl + '/api/Carriers/UploadDoc/?Doctype=' + docType + '&Refnumber=' + refnumber + '&Movenumber=' + movenumber +'&orderID=' +orderId
        return this.http
        .post(this.apiUrl, formData,httpOptions);
    }
    getLoads(){
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };
          this.apiUrl = this.config.apiUrl + '/api/Carriers/typeaheadMoveNumbers'
        return this.http.get<any[]>(this.apiUrl, httpOptions);
    }
}