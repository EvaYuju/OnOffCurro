import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';  

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', // Redirige a Home si no está autenticado
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  },
  {
    path: 'app',
    canActivate: [AuthGuard],  // Aplica el guard
    loadChildren: () => import('./app/app.module').then(m => m.AppPageModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
