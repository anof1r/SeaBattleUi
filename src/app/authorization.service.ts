import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
  
})
export class AuthorizationService {
  //getVal: any;

  constructor(private http: HttpClient) {}
  displayVal = '';
  PasswordVal = '';
  getUsername(username:string){
    this.displayVal = username;
  }
  getPassword(pass:string){
    this.PasswordVal = pass;
  }
  }
