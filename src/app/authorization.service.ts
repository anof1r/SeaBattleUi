import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
  
})
export class AuthorizationService {
  //getVal: any;

  constructor(private http: HttpClient) {}
  displayVal = '';
  getVal(val:string){
    this.displayVal = val;
  }
  auth(nick:string){
    this.getVal(nick);
    this.http.get<any>('http://localhost:11501/test//eap/'+this.displayVal+',anof1rCOOL').subscribe(message => console.log(message.value))
  }
 
}