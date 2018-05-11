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

    postFile(fileToUpload: File, orderId: string,docType:string, refnumber: string, movenumber: number, linehaul: string, accList: Array<any>){
        const formData: FormData = new FormData();
        formData.append('filekey',fileToUpload,fileToUpload.name);
        var data = {
            file: formData,
            lh: linehaul,
            acc: accList
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
        .post(this.apiUrl, data,httpOptions);
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