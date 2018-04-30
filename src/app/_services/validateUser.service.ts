import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AppConfig } from '../app.config';
import { URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class validateUserService {
    apiUrl: string;
    customerId: string;
    constructor(
            private http: HttpClient, 
            private config: AppConfig
        ) { }


    verifyUsername(userName: string){
        var data = {
            user: userName
        };
        this.customerId = ''
        const httpOptions = {
                    headers: new HttpHeaders({
                      'Content-Type':  'application/jsontext/plain, */*',
                      'customerId': ''
                    })
                  };
        this.apiUrl = this.config.apiUrl + '/api/account/verifyUsername?userName='+data.user;
        return this.http.get(this.config.apiUrl +'/api/account/verifyUsername?userName='+data.user , httpOptions)
    }
    verifySecurityQuestions(securityQ: {}){
        this.customerId = ''
        const httpOptions = {
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json;charset=UTF-8',
                      'customerId': ''
                    })
                  };
        this.apiUrl = this.config.apiUrl + '/api/account/VerfiySecurityQuestions';
        return this.http.post(this.apiUrl, securityQ, httpOptions)
    }
    confirmPasswordEmail(routeId: string, routeToken: string) {
        var data = {
            id: routeId,
            token: routeToken
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
              'customerId': ''
            })
          };
          this.apiUrl = this.config.apiUrl + '/api/account/ConfirmPasswordEmail';
        return this.http.post(this.apiUrl, data, httpOptions)
    }
    resetPassword(securityQ: {}){
        this.customerId = ''
        const httpOptions = {
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json;charset=UTF-8',
                      'customerId': ''
                    })
                  };
        this.apiUrl = this.config.apiUrl + '/api/account/ResetPassword';
        return this.http.post(this.apiUrl, securityQ, httpOptions)
    }
    confirmEmail(routeToken:string, routeUser: string){
        var data = {
            id: routeUser,
            token: routeToken
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8',
              'customerId': ''
            })
          };
        this.apiUrl = this.config.apiUrl + '/api/account/ConfirmEmail'
        return this.http.post(this.apiUrl, data,httpOptions)
    }
    register(user: {}){
        this.customerId = ''
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json;charset=UTF-8',
              'customerId': ''
            })
          };
    this.apiUrl = this.config.apiUrl + '/api/account/register';
    return this.http.put(this.apiUrl, user, httpOptions)
    }
}