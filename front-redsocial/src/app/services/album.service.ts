import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { IAlbum } from '../interfaces/i-album';
import { GLOBAL } from './global';
@Injectable()
export class AlbumService {
  url: string;
  albums: any[] = []
  constructor(private _http: Http) {
    this.url = GLOBAL.url
  }

  getAlbums(user_post_album, token: string) {

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    return this._http.get(this.url + 'albums/' + user_post_album, { headers: headers })
      .map(res => res.json())
  }


  postAlbum(user_post_album, token: string) {
    let json = JSON.stringify(user_post_album);
    let params = json;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.post(this.url + 'album', params, { headers: headers })
      .map(res => res.json());
  }

  deleteAlbum(album_to_delete, token: string) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.delete(this.url + 'album/' + album_to_delete._id, { headers: headers })
      .map(res => res.json())
  }
}
