import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizationService } from './authorization.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SeaBattleUi';
  greeting = {}
  constructor(
    private http: HttpClient,
    private auth: AuthorizationService
  )
  {http.get<any>('http://localhost:11501/test/resource').subscribe(data => this.greeting = data);} 
  
}

