import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable'
import { IAlbum } from '../interfaces/i-album';
import { IImage } from '../interfaces/i-image';
import { GLOBAL } from './global';
@Injectable()
export class ImageService {
  url: string;
  imagesAlbum: any[] = []
  iamgeMainFriend: IImage[] = [];
  constructor(private _http: Http) {
    this.url = GLOBAL.url
  }

  getImages(token, albumId = null) {
    //CORREGIR PARA AMIGOS
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    if (albumId == null) {
      return this._http.get(this.url + 'images', { headers: headers })
        .map(res => res.json())
    } else {
      return this._http.get(this.url + 'images/' + albumId, { headers: headers })
        .map(res => res.json())
    }
  }

  getImage(id, token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.get(this.url + 'image/' + id, { headers: headers })
      .map(res => res.json())
  }


  addImage(image_to_load, token) {
    let json = JSON.stringify(image_to_load);
    let params = json;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.post(this.url + 'image', params, { headers: headers })
      .map(res => res.json())
  }

  editImage(id, image_to_edit, token) {
    let json = JSON.stringify(image_to_edit);
    let params = json;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.put(this.url + 'image/' + id, params, { headers: headers })
      .map(res => res.json())
  }

  deleteImage(id, token) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this._http.delete(this.url + 'image/' + id, { headers: headers })
      .map(res => res.json())
  }
}
