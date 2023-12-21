import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsLayoutComponent } from './pages/films-layout/films-layout.component';
import { SeriesLayoutComponent } from './pages/series-layout/series-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'menu.home' },
      },
      {
        path: 'films',
        component: FilmsLayoutComponent,
        data: { title: 'menu.films' },
      },
      {
        path: 'series',
        component: SeriesLayoutComponent,
        data: { title: 'menu.series' },
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [],
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
