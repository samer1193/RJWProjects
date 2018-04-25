import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../app.config';
import { URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';

@Injectable()
export class TermsService {
    apiUrl: string;
    constructor(
            private http: HttpClient, 
            private config: AppConfig
        ) { }

    downloadForPopUp(){  
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };

        this.apiUrl = this.config.apiUrl + '/api/TermsAndConditions';
        return this.http.get(this.apiUrl,httpOptions)
    }
    acceptTerms(){
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };

        this.apiUrl = this.config.apiUrl + '/api/account/acceptterms';
        return this.http.post(this.apiUrl,'',httpOptions)
    }
}