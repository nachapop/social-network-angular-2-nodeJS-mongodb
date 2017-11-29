import { Injectable } from '@angular/core';

import { IUsuario } from '../interfaces/i-usuario';
import { IUsuarioLogueo } from '../interfaces/i-usuario-logueo';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global'
@Injectable()
export class UsuarioService {

  url: string = GLOBAL.url;
  public identity;
  public token: string;

  constructor(private _http: Http) {


  }

  checkIfUserExist(user_to_register: IUsuario) {


    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.get(this.url + 'checkuser/' + user_to_register.email)
  }
  registerUsuario(user_to_register: IUsuario) {
    let json = JSON.stringify(user_to_register);
    let params = json;

    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.post(this.url + 'register', params, { headers: headers })
      .map(res => res.json());
  }
  logueoUsuario(user_to_login, getHash = null) {
    if (getHash != null) {
      user_to_login.getHash = getHash;
    }

    let json = JSON.stringify(user_to_login);
    let params = json;

    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this._http.post(this.url + 'login', params, { headers: headers })
      .map(res => res.json());
  }


  updateUser(user_to_update) {
    let json = JSON.stringify(user_to_update);
    let params = json;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    return this._http.put(this.url + 'update-user/' + user_to_update._id, params, { headers: headers })
      .map(res => {
        return res.json()
      });
  }

  getAllUsers() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    console.log(this.identity)
    return this._http.get(this.url + 'users/' + this.identity._id, { headers: headers })
      .map(res => {
        return res.json()
      });

  }
  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token')
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }
  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'))
    if (identity != undefined) {
      this.identity = identity
    } else {
      this.identity = null
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token')
    if (token != undefined) {
      this.token = token
    } else {
      this.token = null
    }
    return this.token;
  }

}
