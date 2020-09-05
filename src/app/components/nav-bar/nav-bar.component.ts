import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import teamData from '../../../assets/teamData/teams.json'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  opened:Boolean = false;
  teamsExpand:Boolean = false;

  teams = []

  constructor(private router: Router) { 
  }

  ngOnInit() {
    const alph = teamData.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    this.teams = alph
  }

  lowercaseNoSpace(name) {
    return name.split(/\s/).join('');
  }
}
