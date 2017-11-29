import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class WebSocketService {

  constructor() { this.getMessages() }
  private url = 'http://localhost:8080';
  private socket;

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessages() {


    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('messages', (data) => {
        console.log(data)
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
