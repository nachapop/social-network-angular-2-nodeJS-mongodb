import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { MiAlbumComponent } from './components/mi-album/mi-album.component';
import { CargarImagenesComponent } from './components/cargar-imagenes/cargar-imagenes.component';
import { VerAlbumComponent } from './components/ver-album/ver-album.component';

const APP_ROUTES: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'crear-album', component: MiAlbumComponent },
  { path: 'crear-album/:id', component: CargarImagenesComponent },
  { path: 'ver-album/:id', component: VerAlbumComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
