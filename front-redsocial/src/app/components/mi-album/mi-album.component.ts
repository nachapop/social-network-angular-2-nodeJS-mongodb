import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { AlbumService } from '../../services/album.service';
import { ImageService } from '../../services/image.service';
import { IAlbum } from '../../interfaces/i-album';
import { IImage } from '../../interfaces/i-image';
import { Router } from '@angular/router';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-mi-album',
  templateUrl: './mi-album.component.html',
  styleUrls: ['./mi-album.component.scss']
})
export class MiAlbumComponent {
  public identity;
  public token;
  public albumNuevo: IAlbum;
  public albumCollection: IAlbum[];
  public images: IImage[][] = [];

  url: string;
  constructor(private router: Router, public _us: UsuarioService, public _als: AlbumService, public _is: ImageService) {
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();

    this.getAlbums()
    this.url = GLOBAL.url;
    this.albumNuevo = {
      title: '',
      description: '',
      user: this.identity._id
    }
  }
  numeroAlbum: number = 0;

  getImagesAlbum(album) {
    if (album) {
      this._is.getImages(this.token, album._id).subscribe(response => {

        this.images[this.numeroAlbum] = response.images;

        this.numeroAlbum++;
        if (this.numeroAlbum < this.albumCollection.length) {
          this.getImagesAlbum(this.albumCollection[this.numeroAlbum])
        } else {
          this.numeroAlbum = 0;
        }
      }, error => {
        console.log(error)
      })
    }
  }

  getAlbums() {
    this._als.getAlbums(this.identity._id, this.token).subscribe(response => {
      this.albumCollection = response.albums
      this.getImagesAlbum(this.albumCollection[this.numeroAlbum])
    }, error => {
      console.log(error)
    })
  }
  verAlbum(album) {
    this.router.navigate(["/ver-album", album._id])
  }
  editarAlbum(album) {
    this.router.navigate(["/crear-album", album._id])
  }
  eliminarAlbum(album) {
    console.log(album)
    this._als.deleteAlbum(album, this.token).subscribe(response => {
      this.getAlbums()
    }, error => {
      console.log(error)
    })
  }

  crearAlbum() {
    this._als.postAlbum(this.albumNuevo, this.token).subscribe(
      response => {
        this.albumNuevo = {
          title: '',
          description: '',
          user: this.identity._id
        }
        this.getAlbums()
        this.editarAlbum(response.album)
      }, error => {
        console.log(error)
      })
  }
}
