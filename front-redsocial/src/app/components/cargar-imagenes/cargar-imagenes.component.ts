import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AlbumService } from '../../services/album.service';
import { ImageService } from '../../services/image.service';
import { IAlbum } from '../../interfaces/i-album';
import { IImage } from '../../interfaces/i-image';
import { FileItem } from '../../models/file-item';
import { GLOBAL } from '../../services/global';
@Component({
  selector: 'app-cargar-imagenes',
  templateUrl: './cargar-imagenes.component.html',
  styleUrls: ['./cargar-imagenes.component.scss']
})
export class CargarImagenesComponent {
  public identity;
  public token;
  public albumNuevo: IAlbum;
  public albumCollection: IAlbum[];

  estaSobreDropZone: boolean = false;
  permiteCargar: boolean = true;

  archivos: FileItem[] = [];
  archivoDB: IImage;
  imagenesCargadas = 0;
  url: string;
  idAlbum: string;
  constructor(private route: ActivatedRoute, public _us: UsuarioService, public _als: AlbumService, public _is: ImageService) {
    this.url = GLOBAL.url;
    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();
    this.route.params.subscribe(params => {
      this.idAlbum = params['id']
      this.archivoDB = {
        title: "",
        picture: "",
        album: this.idAlbum
      }
    });
  }

  archivoSobreDropZone(e: any) {
    this.estaSobreDropZone = e;
  }

  limpiarArchivos() {
    this.archivos = [];
    this.archivoDB = {
      title: "",
      picture: "",
      album: this.idAlbum
    }
    this.permiteCargar = true;
  }

  cargarImagenes() {
    this.permiteCargar = false;
    //llamar al servicio
    this.cargarImagen(this.archivos[this.imagenesCargadas]);
  }
  cargarImagen(imagen: FileItem) {
    imagen.cargando = true;
    this.archivoDB.title = imagen.title;
    this._is.addImage(this.archivoDB, this.token).subscribe(response => {
      this.makeFileRequest(this.url + 'upload-image/' + response.imagen._id, [], imagen.archivo)
        .then(result => {
          this.resultUpload = result
          this.imagenesCargadas++;
          //  this.archivoDB.picture = this.resultUpload.filename
          this.archivoDB.picture = this.resultUpload.filename

          imagen.cargando = false;
          imagen.completo = true;
          if (this.imagenesCargadas < this.archivos.length) {
            //  this.cargarImagen(this.archivos[this.imagenesCargadas])

            this.cargarImagen(this.archivos[this.imagenesCargadas])
          } else {
            this.imagenesCargadas = 0;
          }
        }, err => {
          console.log(err)
        })

    }, error => {
      imagen.cargando = false;
      imagen.error = true;
      if (this.imagenesCargadas < this.archivos.length) {
        this.cargarImagen(this.archivos[this.imagenesCargadas])
      } else {
        this.imagenesCargadas = 0;
      }
    })
  }

  //public filesToUpload: File;
  public resultUpload;

  // fileChangeEvent(fileInput: any) {
  //   this.filesToUpload = <File>fileInput.target.files;
  // }

  makeFileRequest(url: string, params: Array<string>, files: File) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      formData.append('image', files, files.name);


      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {

            reject(xhr.response)
          }
        }
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Authorization', this.token);
      xhr.send(formData);
    })
  }
}
