import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  winner = "";
  interval: any;
  constructor(private http: HttpClient) {
    this.disableAllButtons();
    var ping = setInterval(() => {
      this.interval = ping
      this.http.get<any>('http://localhost:4200/rest/checkTurn').subscribe(
        isMyTurn => {
          if (isMyTurn.isMyTurn) {
            clearInterval(ping)
            this.http.get<any>('http://localhost:4200/rest/getGameField').subscribe(signs => this.fill(signs))
          }
        }
      )
    }, 100);
  }

  ngOnInit(): void {
  }

  winCheck(){
    // @ts-ignore
    var buttons = [...document.getElementsByTagName("button")]
    return this.checkIndexes(buttons,0,1,2) ||
      this.checkIndexes(buttons,3,4,5) ||
      this.checkIndexes(buttons,6,7,8) ||
      this.checkIndexes(buttons,0,3,6) ||
      this.checkIndexes(buttons,1,4,7) ||
      this.checkIndexes(buttons,2,5,8) ||
      this.checkIndexes(buttons,0,4,8) ||
      this.checkIndexes(buttons,2,4,6)
  }

  checkIndexes(buttons: any, i1: any,i2:any,i3:any){
   if (buttons[i1].innerText == buttons[i2].innerText && buttons[i2].innerText == buttons[i3].innerText && (buttons[i2].innerText == "X" || buttons[i2].innerText == "O")){
     this.winner = buttons[i1].innerText
     return true;
   }
   return false
  }
  
  disableAllButtons() {
    // @ts-ignore
    var buttons = [...document.getElementsByTagName("button")]
    buttons.forEach(button => {
      button.disabled = true;
    });
  }

  turn(id: string) {
    this.http.get<any>('http://localhost:4200/rest/turn/' + id[0] + ',' + id[1]).subscribe(signs => {
      this.fill(signs)
      this.disableAllButtons();
      var ping = setInterval(() => {
        this.interval = ping
        this.http.get<any>('http://localhost:4200/rest/checkTurn').subscribe(
          isMyTurn => {
            if (isMyTurn.isMyTurn) {
              clearInterval(ping)
              this.http.get<any>('http://localhost:4200/rest/getGameField').subscribe(signs => this.fill(signs))
            }
          }
        )
      }, 100);
    })
    console.log(id[0] + ',' + id[1])
  }

  fill(signs: any) {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        // @ts-ignore
        var button = [...document.getElementsByTagName("button")][x * 3 + y]
        button.innerText = signs[x][y]
        if (signs[x][y] != ' ') {
          button.disabled = true;
        }
        else {
          button.disabled = false;
        }

      }
    }
    if (this.winCheck()) {
      //@ts-ignore
      document.getElementById("grid").innerHTML = "<h1> Winner is" + this.winner + "</h1>";
      for (let index = 1; index <= this.interval; index++) {
        clearInterval(index)  
      }    
      console.log("WINNER ")
    }
  }
}
