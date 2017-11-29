import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { WebSocketService } from './services/web-socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],


})

export class AppComponent implements OnInit {
  title = 'app';
  public identity;
  public token;
  connection;
  messages: any = [];
  constructor(public _us: UsuarioService, public _wss: WebSocketService) {

  }
  ngOnInit() {
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this._wss.getMessages().subscribe(message => {
      this.messages.push(message);

    });
  }
  identit() {
    this.identity = this._us.getIdentity();
  }

}
