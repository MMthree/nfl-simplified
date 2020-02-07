import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  overallStandings = []
  divisions = []
  conferences = []
  standingsType = ''
  year = '2019'
  seasonType= 'REG'

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getStandings('2019', "REG");
    this.standingsType = this.route.snapshot.paramMap.get("type");
  }

  getStandings(year, season) {
    try {
      this.http.getStandings(year, season).subscribe(data => {

        const sort = this.sortTeamsByOverallStandings(data);
        this.overallStandings = sort;
        console.log(sort)
        if (this.standingsType === 'division' || !this.standingsType) {
          this.sortTeamsByDivision(sort);
        } else if (this.standingsType === 'conference') {
          this.sortTeamsByConference(sort);
        }

      });
    } catch (error) {
      console.log(error.statusText)
    }
  }

  yearSelecter(e) {
    this.year = e.target.value
    this.getStandings(e.target.value, this.seasonType)
  }

  seasonTypeSelector(e) {
    this.seasonType = e.target.value
    this.getStandings(this.year, e.target.value)
  }

  handleStandingsChange(e) {
    const n = e.target.name;
    this.standingsType = e.target.name
    if (n === 'division') {
      this.sortTeamsByDivision(this.overallStandings);
    } else if (n === 'conference') {
      this.sortTeamsByConference(this.overallStandings)
    }
  }

  sortTeamsByOverallStandings(teams) {
    const overallStandings = teams.teamStandings.sort((a, b) => b.standing.overallWinPct - a.standing.overallWinPct);
    return overallStandings;
  }

  sortTeamsByDivision(teams) {
    let map = {};
    let result = [];
    teams.forEach(t => {
      if (map[t.team.divisionAbbr]) {
        map[t.team.divisionAbbr].push(t)
      } else {
        map[t.team.divisionAbbr] = [t]
      }
    });

    for (let d in map) {
      const firstLetter = d.split('')[0];
      if (firstLetter === 'N') {
        result.unshift(map[d])
      } else {
        result.push(map[d])
      }
    }
    console.log(result);
    this.divisions = result;
  }

  sortTeamsByConference(teams) {
    let map = {};
    let result = [];
    teams.forEach(t => {
      if (map[t.team.conferenceAbbr]) {
        map[t.team.conferenceAbbr].push(t)
      } else {
        map[t.team.conferenceAbbr] = [t]
      }
    });

    for (let d in map) {
      const firstLetter = d.split('')[0];
      if (firstLetter === 'N') {
        result.unshift(map[d])
      } else {
        result.push(map[d])
      }
    }
    console.log(result);
    this.conferences = result;
  }

}
