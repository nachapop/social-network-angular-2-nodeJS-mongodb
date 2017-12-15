import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//libraries
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
//mport { Angular2ImageGalleryModule } from 'angular2-image-gallery';
//Directives
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

import { AppComponent } from './app.component';
//APP_ROUTES
import { APP_ROUTING } from './app.routes';
//services
import { UsuarioService } from './services/usuario.service';
import { FriendService } from './services/friend.service';
import { AlbumService } from './services/album.service';
import { ImageService } from './services/image.service';
import { WebSocketService } from './services/web-socket.service';
//Components
import { EntradaComponent } from './components/entrada/entrada.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CargarImagenesComponent } from './components/cargar-imagenes/cargar-imagenes.component';
import { MiAlbumComponent } from './components/mi-album/mi-album.component';
import { VerAlbumComponent } from './components/ver-album/ver-album.component';


@NgModule({
  declarations: [
    AppComponent,
    EntradaComponent,
    PrincipalComponent,
    NavbarComponent,
    UpdateUserComponent,
    CargarImagenesComponent,
    MiAlbumComponent,
    NgDropFilesDirective,
    VerAlbumComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2FontawesomeModule,
    //Angular2ImageGalleryModule,
    APP_ROUTING
  ],
  providers: [UsuarioService, FriendService, AlbumService, ImageService, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
