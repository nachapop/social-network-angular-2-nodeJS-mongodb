import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { IUsuario } from '../../interfaces/i-usuario';
import { GLOBAL } from '../../services/global'
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public titulo: string;
  public user: IUsuario;
  public identity;
  public token: string;
  alertMessage;
  errorMessage;
  public url: string;
  constructor(public _us: UsuarioService) {
    this.titulo = 'Actualizar mis datos'

    this.identity = this._us.getIdentity();
    this.token = this._us.getToken();

    this.user = this.identity;
    this.url = GLOBAL.url;
  }

  ngOnInit() {
  }
  onSubmit() {
    this._us.updateUser(this.user).subscribe(
      response => {

        if (!response.user) {
          this.alertMessage = 'El usuario no está actualizado'
        } else {
          if (!this.fileToUpload) {
            //redireccion
          } else {
            this.makeFileRequest(this.url + 'upload-image-user/' + this.user._id, [], this.fileToUpload)
              .then((result: any) => {
                this.user.image = result.image;
                localStorage.setItem('identity', JSON.stringify(this.user))

              })
          }
          this.alertMessage = 'El usuario se ha actualizado'

        }

      }, error => {
        if (error != null) {
          var body = JSON.parse(<any>error._body)
          this.errorMessage = body
          alert('Error: ' + this.errorMessage['message'])
        }
      })

  }
  public fileToUpload: File[];
  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <Array<File>>fileInput.target.files
  }

  makeFileRequest(url: string, params: string[], files: File[]) {
    var token = this.token;

    return new Promise(function(resolve, reject) {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response))
          } else {

            reject(xhr.response)
          }
        }
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData)
    })
  }
}
