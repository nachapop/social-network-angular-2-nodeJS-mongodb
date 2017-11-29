import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IUsuario } from '../../interfaces/i-usuario';
import { IUsuarioLogueo } from '../../interfaces/i-usuario-logueo';
import { UsuarioService } from '../../services/usuario.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.scss']
})
export class EntradaComponent implements OnInit {
  usuario: IUsuario
  usuarioLogueo: IUsuarioLogueo
  public identity;
  public token;
  errorMessage: string;
  EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  registroRepuesta: boolean;
  user: any;
  @Output() identit = new EventEmitter();
  constructor(private _us: UsuarioService,

    private router: Router) {
    this.usuario = {
      name: "",
      surname: "",
      email: "",
      password: "",
      image: "",
    }
    this.usuarioLogueo = {
      email: "",
      password: "",
    }
  }

  ngOnInit() {

  }

  checkIfExistUser() {
    this._us.checkIfUserExist(this.usuario).subscribe(response => {
      if (response.json().user.length > 0) {
        alert('usuario ya existe')
      } else {
        this.registro()
      }
    },
      error => {
        if (error != null) {
          var body = JSON.parse(<any>error._body)
          this.errorMessage = body
          alert('Error: ' + this.errorMessage['message'])
        }
      })
  }

  registro() {

    this._us.registerUsuario(this.usuario).subscribe(
      response => {
        this.registroRepuesta = true
        this.user = response.user;

        if (this.user) {
          this.usuarioLogueo.email = this.usuario.email;
          this.usuarioLogueo.password = this.usuario.password;
          //  this.userRegister = new User("", "", "", "", "", "ROLE_USER", "")
        }
      },
      error => {
        this.registroRepuesta = true
        if (error != null) {
          var body = JSON.parse(<any>error._body)
          this.errorMessage = body
          //    alert('Error: ' + this.errorMessage['message'])
        }
      })
  }
  logueo() {
    this._us.logueoUsuario(this.usuarioLogueo).subscribe(
      response => {
        let identity = response.user;

        this.identity = identity;
        if (!this.identity._id) {
          alert('el usuario no esta correctamente identificado')
        } else {
          localStorage.setItem('identity', JSON.stringify(identity))
          //conseguir el token
          this._us.logueoUsuario(this.usuarioLogueo, 'true').subscribe(
            response => {
              let token = response.token;
              this.token = token;

              if (this.token.length <= 0) {
                alert('el token no se ha generado')
              } else {
                //conseguir el token
                localStorage.setItem('token', token)
                this.identit.emit()
              }

            }, error => {
              if (error != null) {
                var body = JSON.parse(<any>error._body)
                this.errorMessage = body
                alert('Error: ' + this.errorMessage['message'])
              }
            })
        }

      }, error => {
        if (error != null) {
          var body = JSON.parse(<any>error._body)
          this.errorMessage = body
          alert('Error: ' + this.errorMessage['message'])
        }
      })

  }
}
