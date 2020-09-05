import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import teamJson from '../../../assets/teamData/teams.json';

@Component({
  selector: 'app-standings-card',
  templateUrl: './standings-card.component.html',
  styleUrls: ['./standings-card.component.scss']
})
export class StandingsCardComponent implements OnInit {
  @Input('title') title: string; 
  @Input('teams') teams: []; 

  constructor(private router: Router) { }

  ngOnInit() {
    this.sortByDivisionRank(this.teams)
  }

  sortByDivisionRank(teams) {
    if (teams.length === 4) {
      const order = teams.sort((a, b) => b.Wins - a.Wins)
      return this.teams = order;
    } else {
      return
    }
  }

  winLossTie(w, l, t) {
    return `${w}-${l}-${t}`
  }

  getTeam(id) {
    const team = teamJson.find(t => t.team_id === id);
    return team
  }

  teamPageWithData(id) {
    const team = this.getTeam(id);
    this.router.navigate([`/team/${team.name.toLowerCase().split(/\s/).join('')}`])
  }

}
