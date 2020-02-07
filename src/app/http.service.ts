import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getStandings (year:string, type:string) {
      return this.http.get(`https://feeds.nfl.com/feeds-rs/standings/${year}/${type}.json`)
  }
}
