import { Component, OnInit } from '@angular/core';

import teams from '../../../assets/teamData/teams.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  team = []
  abbrs = []
  constructor() { }

  ngOnInit() {
    const alpha = teams.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    const abbreviations = alpha.map(t => t.abbr);
 
    this.team = alpha
    this.abbrs = abbreviations
  }

  lowercaseNoSpace(name) {
    return name.split(/\s/).join('');
  }

}
