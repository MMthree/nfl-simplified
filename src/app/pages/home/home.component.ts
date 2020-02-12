import { Component, OnInit } from '@angular/core';

import teams from '../../../assets/teamData/teams.json'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  team = []
  constructor() { }

  ngOnInit() {
    const alpha = teams.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    
    this.team = alpha
  }

}
