import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router, ActivatedRoute } from '@angular/router';


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
  year = '2020'
  seasonType= 'REG'
  loading = false

  constructor(
    private http: HttpService, 
    private route: ActivatedRoute,
    private redirect: Router
  ) { }

  ngOnInit() {
    this.getStandings(this.year, "REG");
    this.standingsType = this.route.snapshot.paramMap.get("type");
  }

  checkUrlParam(param) {
    const match = ['division', 'conference', 'league'].find(t => t === param);

    if (match) {
      return true
    } else {
      return false
    }
  }

  getStandings(year, season) {
    this.loading = true
    try {
      this.http.getStandings(year, season).subscribe(data => {
        console.log(data)

        const sort = this.sortTeamsByOverallStandings(data);
        this.overallStandings = sort;
        if (this.standingsType === 'division' || !this.standingsType) {
          this.sortTeamsByDivision(sort);
        } else if (this.standingsType === 'conference') {
          this.sortTeamsByConference(sort);
        }

      });
      this.loading = false;
    } catch (error) {
      this.loading = false
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
    const overallStandings = teams.sort((a, b) => b.Percentage - a.Percentage);
    return overallStandings;
  }

  sortTeamsByDivision(teams) {
    let map = {};
    let result = [];
    teams.forEach(t => {
      if (map[t.Conference + t.Division]) {
        map[t.Conference + t.Division].push(t)
      } else {
        map[t.Conference + t.Division] = [t]
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

    this.divisions = result;
  }

  sortTeamsByConference(teams) {
    let map = {};
    let result = [];
    teams.forEach(t => {
      if (map[t.Conference]) {
        map[t.Conference].push(t)
      } else {
        map[t.Conference] = [t]
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
    this.conferences = result;
  }

  makeDivisionAbbr(conference, division) {
    return `${conference}${division[0]}`
  };
  addFtoDivisionAbbr(name) {
    const l = name.split('');
    return l[0] + 'F' + l[1] + l[2]
  }
}
