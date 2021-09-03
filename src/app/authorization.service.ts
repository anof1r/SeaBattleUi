import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
  
})
export class AuthorizationService {
  getVal: any;

  constructor(private http: HttpClient) {}

  auth(nick:string){
    this.http.get<any>('http://localhost:11501/test//eap/'+this.getVal(nick)+',anof1rCOOL').subscribe(message => console.log(message.value))
  }
 
}