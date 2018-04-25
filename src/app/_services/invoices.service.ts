import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../app.config';
import { URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';
import { Invoices } from '../invoices/invoices.model'

@Injectable()
export class InvoiceService {
    apiUrl: string;
    constructor(
            private http: HttpClient, 
            private config: AppConfig
        ) { }

    getInvoices(_carrierID: string){  //:Observable<Invoices[]> 
        var data = {
            carrierID: _carrierID 
        };
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              carrierId: _carrierID
            })
          };

        this.apiUrl = this.config.apiUrl + '/api/Carriers/Invoices';
        return this.http.post(this.apiUrl, data,httpOptions)
    }
}