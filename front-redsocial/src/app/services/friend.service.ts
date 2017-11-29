import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { IAlbum } from '../interfaces/i-album';

import { IUsuario } from '../interfaces/i-usuario';
import { GLOBAL } from './global';
@Injectable()
export class FriendService {
  url: string;
  follows: any[] = []
  constructor(private http: Http) {
    this.url = GLOBAL.url
  }
  getPossibleFriends(nombreAmigo, token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.get(this.url + 'checkuser/' + nombreAmigo, { headers: headers })
      .map(res => res.json())
  }

  getFriends(user, token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.get(this.url + 'amistades/' + user._id, { headers: headers })
      .map(res => {
        this.follows = res.json().friend
        console.log(this.follows)
        return this.follows
      })
  }

  getFollowers(user, token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.get(this.url + 'follower/' + user._id, { headers: headers })
      .map(res => res.json())
  }
  getNewFollowers(user, token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.get(this.url + 'newfollower/' + user._id, { headers: headers })
      .map(res => res.json())
  }
  emptyNewFollowers(user, token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.put(this.url + 'newfollower/' + user._id, {}, { headers: headers })
      .map(res => res.json())
  }
  deleteFriends(user, token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.delete(this.url + 'follow/' + user._id, { headers: headers })
      .map(res => res.json())
  }
  postFriend(user, friend, token) {

    let json = JSON.stringify({ user: user._id, friend: friend._id });
    let params = json;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this.http.post(this.url + 'follow/', params, { headers: headers })
      .map(res => {
        console.log(res.json())
        return res.json()
      })
  }
}
