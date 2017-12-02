import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],


})

export class AppComponent implements OnInit {
  title = 'app';
  public identity;
  public token;

  //messages: any = [];
  constructor(public _us: UsuarioService) {

  }
  ngOnInit() {
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();

  }
  identit() {
    this.identity = this._us.getIdentity();
  }


}
