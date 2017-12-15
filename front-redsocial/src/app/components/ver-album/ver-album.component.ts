import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AlbumService } from '../../services/album.service';
import { ImageService } from '../../services/image.service';
import { IAlbum } from '../../interfaces/i-album';
import { IImage } from '../../interfaces/i-image';
import { GLOBAL } from '../../services/global';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ver-album',
  templateUrl: './ver-album.component.html',
  styleUrls: ['./ver-album.component.scss']
})
export class VerAlbumComponent implements OnInit {
  public identity;
  public token;
  url: string;
  imagenes: IImage[] = []
  album: string
  i: number = 1;
  constructor(private router: Router, private route: ActivatedRoute, public _us: UsuarioService, public _als: AlbumService, public _is: ImageService) {
    this.url = GLOBAL.url;
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this.route.params.subscribe(params => {
      this.album = params['id'];
      this.getImagenes()
    });
  }
  getImagenes() {
    this._is.getImages(this.token, this.album).subscribe(
      response => {
        this.imagenes = response.images

        console.log(this.imagenes)
      },
      error => {
        console.log(error)
      })
  }
  eliminarAlbum(imagen) {
    this._is.deleteImage(imagen._id, this.token).subscribe(
      response => {
        this.getImagenes();


      },
      error => {
        console.log(error)
      }
    );
  }
  ngOnInit() {
  }
  moverCarousel(direccion) {
    this.i = direccion ? ++this.i : --this.i;
    if (this.i == this.imagenes.length) {
      this.i = 0;
    }
    if (this.i == -1) {
      this.i = this.imagenes.length - 1;
    }
  }
  verModal(id) {
    this.i = id
  }


  actualizarAlbum() {
    this.router.navigate(["/crear-album/", this.album])
  }
  volver() {
    this.router.navigate(["/crear-album"])
  }
  eliminarImagen(imagen: any) {
    console.log(imagen)
    this._is.deleteImage(imagen._id, this.token).subscribe(data => {
      this.getImagenes();
    })
  }
}
