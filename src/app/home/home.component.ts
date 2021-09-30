import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Demo';
  greeting : any;
  nick: any;
  avaliable: any = {};


  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    http.get('http://localhost:4200/rest/resource').subscribe(data => this.greeting = data);
    http.get('http://localhost:4200/rest/user').subscribe(data => this.nick = data)
  }
  userName(){ 
   
  }
  authenticated() { return this.app.authenticated; }

  startGame() {
    this.http.get<any>('http://localhost:4200/rest/startGame').subscribe(
      response => {
        if (response.game) {
          this.router.navigateByUrl('/game')
        }
        else {
          var ping = setInterval(() => {
            this.http.get<any>('http://localhost:4200/rest/getGame').subscribe(
              res => {
                if (res.game) {
                  clearInterval(ping);
                  this.router.navigateByUrl('/game')

                }
              }
            )
          }, 100);
        }

      })
  }
}