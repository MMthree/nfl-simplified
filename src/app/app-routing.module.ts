import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { StandingsComponent } from './pages/standings/standings.component';
import { TeamsComponent } from './pages/teams/teams.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent 
  },
  {
    path: 'standings',
    component: StandingsComponent
  },
  {
    path: 'standings/:type',
    component: StandingsComponent
  },
  {
    path: 'team',
    component: TeamsComponent
  },
  {
    path: 'team/:teamId',
    component: TeamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
