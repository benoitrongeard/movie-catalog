import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsLayoutComponent } from './pages/films-layout/films-layout.component';
import { SeriesLayoutComponent } from './pages/series-layout/series-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full' },
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
  { path: '**', redirectTo: '/films', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
