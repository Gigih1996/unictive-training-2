import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { loginGuard } from '@core/guards/login.guard';

export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },

  //MARK: DASHBOARD
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./PAGES/home/home.component').then(m => m.HomeComponent)
  },

  //MARK: AUTHENTICATION
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./PAGES/authentication/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: '**',
    loadComponent: () => import('./PAGES/authentication/page404/page404.component').then(m => m.Page404Component)
  }
];
