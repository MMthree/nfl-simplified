import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-standings-card',
  templateUrl: './standings-card.component.html',
  styleUrls: ['./standings-card.component.scss']
})
export class StandingsCardComponent implements OnInit {
  @Input('title') title: string; 
  @Input('teams') teams: []; 

  constructor() { }

  ngOnInit() {
    this.sortByDivisionRank(this.teams)
  }

  sortByDivisionRank(teams) {
    if (teams.length === 4) {
      const order = teams.sort((a, b) => a.standing.divisionRank - b.standing.divisionRank)
      return this.teams = order;
    } else {
      return
    }
  }

  winLossTie(w, l, t) {
    return `${w}-${l}-${t}`
  }

}
