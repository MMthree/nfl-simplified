import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getCurrentWeek () {
    return this.http.get('https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=defda8911b1243f2909ed00328744c5d')
  }

  getScoresByWeek(week:number, season:number) {
    return this.http.get(`https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${season}/${week}?key=defda8911b1243f2909ed00328744c5d`)
  }

  getStandings (year:string, type:string) {
      return this.http.get(`https://api.sportsdata.io/v3/nfl/scores/json/Standings/${year}${type}?key=defda8911b1243f2909ed00328744c5d`)
  }

  getTeams() {
    return this.http.get(`https://api.sportsdata.io/v3/nfl/scores/json/Teams?key=defda8911b1243f2909ed00328744c5d`)
  }

  // Deprecated
  getCoachByTeam(teamId:string) {
    //const currentYear = new Date().getFullYear();
    return this.http.get(`https://feeds.nfl.com/feeds-rs/coach/byTeam/${teamId}/2019.json`)
  }

  getScheduleByTeamAndYear(team:string, year:string) {
    const zone = moment.tz.guess();
    const abbr = moment.tz(zone).format('z');
    
    return this.http.get(`https://api.sportsdata.io/v3/nfl/scores/json/Scores/${year}?key=defda8911b1243f2909ed00328744c5d`)
  }
}
