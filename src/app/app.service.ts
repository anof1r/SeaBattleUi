import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated: boolean = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials: any, callback: any) {

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        this.http.get<any>('http://localhost:4200/rest/user', {headers: headers}).subscribe(response => {
            console.log(response)
            if (response.authenticated) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });
    }
}