import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  clicked = false;
  title = 'Demo';
  greeting = {};
  nick: any = {};
  avaliable: any = {};


  constructor(private app: AppService, private http: HttpClient,private router: Router) {
    http.get('http://localhost:4200/rest/resource').subscribe(data => this.greeting = data);
  }

  authenticated() { return this.app.authenticated; }
  waitForResponse() {   
    this.http.get<any>('http://localhost:4200/rest/checkAvailable').subscribe(
    response => {
    console.log(response);
    this.avaliable = response;
    return this.avaliable;
  });
  }

  startGame(){
    this.http.get<any>('http://localhost:4200/rest/startGame').subscribe(
      response => {
        if (response.game) {
          console.log(response)
          this.router.navigateByUrl('/game'+ response.game)          
        }
        else{  
          var ping = setInterval(()=>{          
            this.http.get<any>('http://localhost:4200/rest/getGame').subscribe(
              res => {
                if (res.game) {
                  console.log(res)
                  clearInterval(ping);                 
                  this.router.navigateByUrl('/game'+ res.game)
                }               
              }
            )
          }, 1000);                 
        }
        document.write('<h2>WAITING</h2>')          
      })
  }
}