import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Weather } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-all-weather',
  templateUrl: './all-weather.component.html',
  styleUrls: ['./all-weather.component.css']
})
export class AllWeatherComponent implements OnInit {

  weather: Weather[] = [];
  listOfData: Weather[] = [];
  displayedColumns: string[] = ['id', 'date', 'temp', 'weather_code'];
  weatherDataSource = new MatTableDataSource(this.listOfData);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.weatherService.getAll().subscribe(weather => {
      this.weather = weather;
      this.listOfData = [...this.weather];
      this.weatherDataSource = new MatTableDataSource(this.listOfData);
      this.weatherDataSource.paginator = this.paginator;
      this.weatherDataSource.sort = this.sort;
      this.paginator._intl.itemsPerPageLabel = '';
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.weatherDataSource.filter = filterValue.trim().toLowerCase();
  }
}
