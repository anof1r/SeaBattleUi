import { Component } from '@angular/core';
import { AuthorizationService } from './authorization.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SeaBattleUi';
  displayVal = '';
  constructor(
    private send:AuthorizationService
  )
  {}
  getVal(val:string){
    this.displayVal = val;
    this.send.auth(this.displayVal)
    setTimeout(this.getVal, 5000);
  }

}

