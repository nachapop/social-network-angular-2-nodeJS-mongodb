import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { GLOBAL } from './global';

@Injectable()
export class WebSocketService {

  constructor() {

  }
  private url = GLOBAL.urlSocket;
  private socket;


  nuevaConeccion(user) {
    console.log(user)


  }

  sendFollow(user) {
    //  this.socket.emit('add-follow', user);
    this.socket.emit('name', user);

  }


  sendConnection(id) {
    //this.socket.emit('nameuser', user);
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.emit('nameuser', id);
      // this.socket.on('name', (data) => {
      //   this.nuevaConeccion(id)
      //   observer.next(data);
      // });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  sendDataTonameSpace(id_follow) {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.emit('nameuser', id_follow);
      // this.socket.on('name', (data) => {
      //   this.nuevaConeccion(id)
      //   observer.next(data);
      // });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
  getNameSpace(id) {
    let observable = new Observable(observer => {
      this.socket = io(this.url + '/user-namespace/' + id);
      this.socket.on('event-namespace', (data) => {
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
