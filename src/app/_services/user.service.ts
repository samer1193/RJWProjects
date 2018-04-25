import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    apiUrl: string;
    constructor(private http: HttpClient, private config: AppConfig) { }
    userList(){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };
        return this.http.get(this.config.apiUrl +'/api/users' + '?pageNumber=1&pageSize=75', httpOptions)
    }
    sendResetEmail(_userId: string) {
        var data = {
            userId: _userId
        };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json, text/plain, */*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };
        this.apiUrl = this.config.apiUrl + '/api/users/sendResetEmail/' + data.userId;
        return this.http.post(this.apiUrl,'', httpOptions)
    }
    userEdit(){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };
        return this.http.get(this.config.apiUrl +'/api/users/' + sessionStorage.getItem('selectedUserId'), httpOptions)

    }
    update(user){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };
        return this.http.put(this.config.apiUrl +'/api/users/',user, httpOptions)
    }
    add(user){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };
          this.apiUrl = this.config.apiUrl + '/api/users'
        return this.http.post(this.apiUrl,user, httpOptions)
    }
    roles(){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json, ',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                carrierId: sessionStorage.getItem('selectedCarrierId')
            })
          };
          return this.http.get(this.config.apiUrl +'/api/siteroles/All', httpOptions)
    }
    typeahead(searchString: string){
      const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            carrierId: sessionStorage.getItem('selectedCarrierId')
        })
      };
    return this.http.get(this.config.apiUrl +'/api/carriers/typeahead' +  '?searchString=' + searchString, httpOptions)
    }
    carriersFromServer(){
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                carrierId: sessionStorage.getItem('selectedCarrierId')
            })
        };
        return this.http.get(this.config.apiUrl + '/api/account/Carriers', httpOptions)
    }
    changeSelected(settings: string){
        var data = {
            settings: settings
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                carrierId: sessionStorage.getItem('selectedCarrierId')
            })
        };
        return this.http.post(this.config.apiUrl +'/api/settings/selectedCarrierId', data,httpOptions)
    }
    changePassword(password: string, currentPassword: string, confirmPassword: string){
        var data = {
            password: password,
            currentPassword: currentPassword,
            confirmPassword: confirmPassword
        }
        const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            carrierId: sessionStorage.getItem('selectedCarrierId')
        })
    };
    return this.http.post(this.config.apiUrl +'/api/account/ChangePassword', data,httpOptions)
}
}