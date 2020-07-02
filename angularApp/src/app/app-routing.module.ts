import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { AllWeatherComponent } from './components/all-weather/all-weather.component';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'weathers', pathMatch: 'full' },
  { path: 'weathers', component: CurrentWeatherComponent },
  { path: 'weathers/all', component: AllWeatherComponent }
];
