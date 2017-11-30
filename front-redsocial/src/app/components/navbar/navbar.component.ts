import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FriendService } from '../../services/friend.service';
import { IUsuario } from '../../interfaces/i-usuario';
import { GLOBAL } from '../../services/global';
import { AlbumService } from '../../services/album.service';
import { ImageService } from '../../services/image.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class NavbarComponent implements OnInit {
  amigosPosibles: IUsuario[] = []

  errorMessage: string;
  public identity;
  public token;
  url: string
  amigoText: string;
  inputSearch: boolean;
  constructor(public _us: UsuarioService,
    public _fs: FriendService,
    private _as: AlbumService,
    private _is: ImageService) {
    //  this.getAlluser()
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this.url = GLOBAL.url
    this.getFriends();
  }
  @Output() identit = new EventEmitter();
  ngOnInit() {
  }
  logout() {
    this._us.logout()
    this.identit.emit()
  }


  getPossibleFriends() {
    if (this.amigoText.length > 0) {
      this._fs.getPossibleFriends(this.amigoText, this.token).subscribe(response => {
        //  let user = response.user;
        this.amigosPosibles = response.users
        for (let amigoPosible of this.amigosPosibles) {
          amigoPosible.textClass = 'Siguiendo'
          for (let follow of this._fs.follows) {
            if (follow.friend._id == amigoPosible._id) {
              amigoPosible.isFriend = true;
              break;
            }
          }

        }
      },
        error => {
        })
    } else {
      this.amigosPosibles = []
    }
  }

  postfollow(amigoPosible) {
    this._fs.postFriend(this.identity, amigoPosible, this.token).subscribe(response => {
      //  let user = response.user;
      this._fs.follows = response.folow;
      this.getFriends()

      //
    },
      error => {
        console.log('err')
      })
  }
  deleteFollow(amigoPosible) {
    for (let follow of this._fs.follows) {
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
    this._fs.follows = [];
    this._as.albums = [];
    this._is.imagesAlbum = []
    this._fs.getFriends(this.identity, this.token).subscribe(response => {
      //  let user = response.user;

      this._fs.follows = response

      for (let amigoPosible of this.amigosPosibles) {
        amigoPosible.isFriend = false
        for (let follow of this._fs.follows) {
          if (follow.friend._id == amigoPosible._id) {
            amigoPosible.isFriend = true;
            break;
          }
        }

      }
      this.getAlbumFollow();
    },
      error => {
        console.log('err')
      })
  }
  albumNum: number = 0;

  getAlbumFollow() {
    this._as.getAlbums(this._fs.follows[this.albumNum].friend._id, this.token).subscribe(
      response => {
        this._as.albums = response.albums

        if (this._as.albums.length > 0)
          this.getImagesAlbum(this._as.albums[this.albumNum])
        //      console.log(this.)
      }, error => {

      })
  }

  getImagesAlbum(album) {
    this._is.getImages(this.token, album._id).subscribe(
      response => {
        this._is.imagesAlbum = this._is.imagesAlbum.concat(response.images)
        //    this.imagesAlbum.sort(function(a, b) { return (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0); });

        this.albumNum++
        if (this.albumNum < this._as.albums.length) {
          this.getImagesAlbum(this._as.albums[this.albumNum])
        } else {
          this.ordenarImagenesPorFecha()
          this.albumNum = 0;
        }
      }, error => {

      })
  }
  ordenarImagenesPorFecha() {
    this._is.imagesAlbum.sort((a, b) => {
      if (a.album.date < b.album.date)
        return 1;
      if (a.album.date > b.album.date)
        return -1;
      return 0;
    })

  }


  changeStyle($event, amigoPosible) {
    amigoPosible.class = $event.type == 'mouseover' ? 'btn-danger' : 'btn-primary';
    amigoPosible.textClass = $event.type == 'mouseover' ? 'No seguir' : 'Siguiendo';
  }

  onClick($event) {
    if ($event.target.id == 'myInput' || $event.target.id == 'list-ul') {
      this.inputSearch = false;
    } else {
      this.inputSearch = true;
    }
  }
}
