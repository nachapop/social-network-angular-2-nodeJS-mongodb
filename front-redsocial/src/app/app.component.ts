import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { WebSocketService } from './services/web-socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  public identity;
  public token;
  connection: any;
  //messages: any = [];
  constructor(public _us: UsuarioService,
    private _ws: WebSocketService) {

  }
  ngOnInit() {
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this.connection = this._ws.sendConnection(this.identity._id).subscribe(message => {
      console.log(message)
    })

  }
  identit() {
    this.identity = this._us.getIdentity();
  }


  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
