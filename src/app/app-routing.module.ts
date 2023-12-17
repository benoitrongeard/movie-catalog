import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsLayoutComponent } from './pages/films-layout/films-layout.component';
import { SeriesLayoutComponent } from './pages/series-layout/series-layout.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
