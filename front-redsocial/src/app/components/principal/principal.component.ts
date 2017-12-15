import { Component, OnInit, Input } from '@angular/core';
import { FriendService } from '../../services/friend.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../interfaces/i-usuario';
import { IImage } from '../../interfaces/i-image';
import { GLOBAL } from '../../services/global';
import { AlbumService } from '../../services/album.service';
import { ImageService } from '../../services/image.service';
import { WebSocketService } from '../../services/web-socket.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  public identity;
  public token: string;
  public user: IUsuario;
  public url: string;
  public follows: any[] = []
  public followers: IUsuario[] = []
  public newFollowers: IUsuario[] = []
  public albums: any = [];
  public imageMain: IImage[] = []
  public imagesAlbum: any = []
  public connection;
  constructor(private route: ActivatedRoute,
    public _fs: FriendService,
    public _us: UsuarioService,
    private _as: AlbumService,
    private _is: ImageService,
    private _ws: WebSocketService) {
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
    //  this.getFriends()
    this.getFollowers()
    this.getNewFollowers()

  }

  getFollowers() {
    this._fs.getFollowers(this.identity, this.token).subscribe(
      response => {
        this.followers = response.follower
      }, error => {

      })
  }
  getNewFollowers() {
    this._fs.getNewFollowers(this.identity, this.token).subscribe(
      response => {
        this.newFollowers = response.follower
      }, error => {

      })
  }
  updated: number = 0;
  emptyNewFollowList() {
    let updated = 0;
    this.updateFollow();

  }
  updateFollow() {
    this._fs.emptyNewFollowers(this.newFollowers[this.updated], this.token).subscribe(
      response => {
        this.updated++;
        if (this.updated < this.followers.length) {
          this.updateFollow()
        } else {
          this.updated = 0;
          this.newFollowers = []
        }
      }, error => {

      })
  }
  ngOnInit() {
    this.connection = this._ws.getNameSpace(this.identity._id).subscribe(message => {
      this.getFollowers();
      this.getNewFollowers();
    })
  }
  verModal(i) {

  }
}
