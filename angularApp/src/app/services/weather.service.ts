import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private readonly weatherApi = 'http://localhost:8080/api/weathers';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.weatherApi}/allWeather`);
  }

  getFive(): Observable<any> {
    return this.http.get(this.weatherApi);
  }
}
