// import {Injectable} from '@angular/core';
// import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map'

// import { AppConfig } from '../app.config';
// import { URLSearchParams } from "@angular/http";
 
// @Injectable()
// export class ProfileService {
//     carrierProfile: Observable<any>;
//     constructor(
//         private http:HttpClient,
//         private config: AppConfig
//     ) {}
//     getProfile( _carrierID: string ) {
//         console.log("selectedCustomerId " + _carrierID);
//         console.log('Bearer ' + localStorage.getItem('token'));    
//         let headers = new HttpHeaders().set ('Authorization', 'Bearer ' + localStorage.getItem('token')).set ('customerId', _carrierID).set ('Content-Type', 'application/json');
        
//         console.log(headers);

//         let apiUrl = this.config.apiUrl + '/api/Carriers/Profile';
//         console.log(apiUrl);
//         //let data = new URLSearchParams();
//         //data.append('carrierID', carrierID)

//         // var data = {carrierID:_carrierID};
//         const data= {
//             carrierId: _carrierID
//         };

//         this.carrierProfile = this.http.post(apiUrl, data,{ headers }) 

//     //     .map((response: Response) => {
//     //         let carrierProfile = response.json();
//     //         console.log(carrierProfile);
//     //         return carrierProfile;
//     // });
//     }
// }

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';
import { URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';

@Injectable()
export class ProfileService {
    apiUrl: string;
    constructor(
            private http: Http, 
            private config: AppConfig
        ) { }

    getProfile(_carrierID: string) {
        var data = {
            carrierID: _carrierID 
        };
        const httpOptions = {
            headers: new Headers({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              carrierId: _carrierID
            })
          };

        this.apiUrl = this.config.apiUrl + '/api/Carriers/Profile';
       return this.http.post(this.apiUrl, data,httpOptions)
       .map((res => res.json())
       );
    }
}