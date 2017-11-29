import { Component, OnInit, Input } from '@angular/core';
import { FriendService } from '../../services/friend.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '../../interfaces/i-usuario';
import { GLOBAL } from '../../services/global';
import { AlbumService } from '../../services/album.service';
import { ImageService } from '../../services/image.service';
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
  public imagesAlbum: any = []
  constructor(private route: ActivatedRoute,
    public _fs: FriendService,
    public _us: UsuarioService,
    private _as: AlbumService,
    private _is: ImageService) {
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this.user = this.identity;
    this.url = GLOBAL.url;
    //  this.getFriends()
    this.getFollowers()
    this.getNewFollowers()

  }
  /*  getFriends() {
      this._fs.getFriends(this.identity, this.token).subscribe(
        response => {
          this.follows = response
          this.id_friend = []
          console.log('yo', this.identity)
          for (let follow of this.follows) {
            this.id_friend.push(follow.friend._id)
          }
          this.getAlbumFollow();
        }, error => {

        })
    }
    albumNum: number = 0;
    id_friend = []
    getAlbumFollow() {
      this._as.getAlbums(this.id_friend[this.albumNum], this.token).subscribe(
        response => {
          console.log(response)
          this.albums = response.albums
          console.log(this.albums)
          if (this.albums.length > 0)
            this.getImagesAlbum(this.albums[this.albumNum])
          //      console.log(this.)
        }, error => {

        })
    }

    getImagesAlbum(album) {
      console.log(album)
      this._is.getImages(this.token, album._id).subscribe(
        response => {
          this.imagesAlbum = this.imagesAlbum.concat(response.images)
          console.log(this.imagesAlbum)
          //    this.imagesAlbum.sort(function(a, b) { return (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0); });

          this.albumNum++
          if (this.albumNum < this.albums.length) {
            this.getImagesAlbum(this.albums[this.albumNum])
          } else {
            this.ordenarImagenesPorFecha()
            this.albumNum = 0;
          }
        }, error => {

        })
    }
    ordenarImagenesPorFecha() {
      this.imagesAlbum.sort((a, b) => {
        if (a.album.date < b.album.date)
          return 1;
        if (a.album.date > b.album.date)
          return -1;
        return 0;
      })

    }
  */
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
  }

}
