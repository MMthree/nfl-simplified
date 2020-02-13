import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getStandings (year:string, type:string) {
      return this.http.get(`https://feeds.nfl.com/feeds-rs/standings/${year}/${type}.json`)
  }

  getTeams() {
    return this.http.get(`https://feeds.nfl.com/feeds-rs/teams.json`)
  }

  getCoachByTeam(teamId:string) {
    //const currentYear = new Date().getFullYear();
    return this.http.get(`https://feeds.nfl.com/feeds-rs/coach/byTeam/${teamId}/2019.json`)
  }

  getScheduleByTeamAndYear(team:string) {
    const zone = moment.tz.guess();
    const abbr = moment.tz(zone).format('z');
    
    return this.http.get(`https://feeds.nfl.com/feeds-rs/scores/byTeam/${team}/2019.json?tz=${abbr}`)
  }
}
