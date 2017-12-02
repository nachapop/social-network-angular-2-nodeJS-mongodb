import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { GLOBAL } from './global';

@Injectable()
export class WebSocketService {

  constructor() { }
  private url = GLOBAL.urlSocket;
  private socket;




  sendFollow(user) {
    //  this.socket.emit('add-follow', user);
    this.socket.emit('add-message', user);

  }


  getNewFollow() {


    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}

  // sendMessage(message) {
  //   this.socket.emit('add-message', message);
  // }

  // getMessages() {
  //   let observable = new Observable(observer => {
  //     this.socket = io(this.url);
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   })
  //   return observable;
  // }

  // sendMessage(message) {
  //   this.socket.emit('add-message', message);
  // }
  // getMessages() {
  //   let observable = new Observable(observer => {
  //
  //     this.socket = io(this.url);
  //     this.socket.on('messages', (data) => {
  //       console.log(data)
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   })
  //   return observable;
  // }
