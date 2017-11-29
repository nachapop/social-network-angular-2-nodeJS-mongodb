import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FriendService } from '../../services/friend.service';
import { IUsuario } from '../../interfaces/i-usuario';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-buscar-amigos',
  templateUrl: './buscar-amigos.component.html',
  styleUrls: ['./buscar-amigos.component.scss']
})
export class BuscarAmigosComponent implements OnInit {
  amigosPosibles: IUsuario[] = []
  follows: any[] = []
  errorMessage: string;
  public identity;
  public token;
  url: string
  amigoText: string;
  constructor(public _us: UsuarioService, public _fs: FriendService) {
    //  this.getAlluser()
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this.url = GLOBAL.url
    this.getFriends();
  }

  ngOnInit() {
  }

  getPossibleFriends() {

    this._fs.getPossibleFriends(this.amigoText, this.token).subscribe(response => {
      //  let user = response.user;
      this.amigosPosibles = response.users
      for (let amigoPosible of this.amigosPosibles) {
        for (let follow of this.follows) {
          if (follow.friend._id == amigoPosible._id) {
            amigoPosible.isFriend = true;
            break;
          }
        }

      }
    },
      error => {
        console.log('err')
      })
  }

  postfollow(amigoPosible) {
    this._fs.postFriend(this.identity, amigoPosible, this.token).subscribe(response => {
      //  let user = response.user;
      this.follows = response.folow;
      this.getFriends()
      //
    },
      error => {
        console.log('err')
      })
  }
  deleteFollow(amigoPosible) {
    for (let follow of this.follows) {
      if (follow.friend._id == amigoPosible._id) {
        this._fs.deleteFriends(follow, this.token).subscribe(response => {
          this.getFriends()
        },
          error => {
            console.log('err')
          })
        break;
      }
    }
  }
  getFriends() {
    this._fs.getFriends(this.identity, this.token).subscribe(response => {
      //  let user = response.user;

      this.follows = response
      console.log(this.follows)
      for (let amigoPosible of this.amigosPosibles) {
        amigoPosible.isFriend = false
        for (let follow of this.follows) {
          if (follow.friend._id == amigoPosible._id) {
            amigoPosible.isFriend = true;
            break;
          }
        }
      }
    },
      error => {
        console.log('err')
      })

  }



}
