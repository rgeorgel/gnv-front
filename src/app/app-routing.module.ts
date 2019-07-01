import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list-station/list-station.module#ListStationPageModule'
  },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'add-station', loadChildren: './add-station/add-station.module#AddStationPageModule' },
  { path: 'simulation', loadChildren: './simulation/simulation.module#SimulationPageModule' },
  { path: 'add-station-map', loadChildren: './add-station-map/add-station-map.module#AddStationMapPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
