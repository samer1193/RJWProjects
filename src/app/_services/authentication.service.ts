import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';
import { URLSearchParams } from "@angular/http";
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

    isLoggedin: boolean = false;
    redirectUrl: string;
    public admin: boolean = true;
    constructor(
            private http: Http, 
            private config: AppConfig,
            private router: Router
        ) { }

    login(grant_type: string, username: string, password: string) {
        let data = new URLSearchParams();
        let admin = false;
        data.append('grant_type', grant_type);
        data.append('username', username);
        data.append('password', password);

        return this.http.post(this.config.apiUrl + '/token', data)
            .map((response: Response) => {
                let user = response.json();
                    sessionStorage.setItem('selectedCarrierId', user.selectedCarrierId);
                    sessionStorage.setItem('acceptedTermsConditions', user.acceptedTermsConditions);
                    sessionStorage.setItem('currentUser',user.userName);
                    sessionStorage.setItem('token',user.access_token);
                    sessionStorage.setItem('roles',user.roles);
                    console.log(sessionStorage.getItem('roles'))
                    if (sessionStorage.getItem('roles').search('administrators') == -1) {
                        this.admin= false;
                        console.log("The user is an admin: " + this.admin)
                    } else {
                        this.admin = true;
                        console.log("The user is an admin: " + this.admin)
                    }
                    return this.isLoggedin = true;

            });
    }
    logout() {
        // remove user from local storage to log user out
        sessionStorage.clear();
        this.isLoggedin = false;
        this.router.navigate(['/login']);
    }
}