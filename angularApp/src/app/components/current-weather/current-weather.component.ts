import { WeatherService } from 'src/app/services/weather.service';
import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})

export class CurrentWeatherComponent implements OnInit {
  weathers: Weather[] = [];
  listOfData: Weather[] = [];

  constructor(
    private weatherService: WeatherService,
  ) { }

  public iconMap = {
    freezing_rain_heavy: 'ac_unit',
    freezing_rain: 'ac_unit',
    freezing_rain_light: 'ac_unit',
    freezing_drizzle: 'ac_unit',
    ice_pellets_heavy: 'ac_unit',
    ice_pellets: 'ac_unit',
    ice_pellets_light: 'ac_unit',
    snow_heavy: 'ac_unit',
    snow: 'ac_unit',
    snow_light: 'ac_unit',
    flurries: 'ac_unit',
    tstorm: 'flash_on',
    rain_heavy: 'beach_access',
    rain: 'beach_access',
    rain_light: 'beach_access',
    drizzle: 'beach_access',
    fog_light: 'user-secret',
    fog: 'user-secret',
    cloudy: 'wb_cloudy',
    mostly_cloudy: 'wb_cloudy',
    partly_cloudy: 'wb_cloudy',
    mostly_clear: 'wb_sunny',
    clear: 'wb_sunny'
  };

  ngOnInit() {
    this.refreshTable();

  }

  refreshTable() {
    this.weatherService.getFive().subscribe(weather => {
      this.weathers = weather;
      this.listOfData = [...this.weathers];
    });
    this.listOfData = [...this.weathers];
  }

}
