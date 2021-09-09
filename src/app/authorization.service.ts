import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
  
})
export class AuthorizationService {
  //getVal: any;

  constructor(private http: HttpClient) {}
  
  authFull(nick:string, pass:string){
    this.http.get<any>('http://localhost:11501/test//eap/'+nick+','+pass).subscribe(message => console.log(message.nickname))
  }
  }
