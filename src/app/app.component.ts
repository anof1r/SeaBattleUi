import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SeaBattleUi';
  UsernameVal = '';
  PasswordVal = '';
  constructor(
    private http: HttpClient
  )
  {}
  getLogin(Username:string){
    this.UsernameVal = Username;
    setTimeout(this.getLogin, 5000);
  }
  getPassword(pass:string){
    this.PasswordVal = pass;
    setTimeout(this.getPassword, 5000);
  }
  authFull(nick:string, pass:string){
    this.getLogin(nick);
    this.getPassword(pass);
    this.http?.get<any>('http://localhost:11501/test//eap/'+this.UsernameVal+','+this.PasswordVal).subscribe(message => console.log(message.value))
  }

}

