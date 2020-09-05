import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import moment from 'moment';
import teamData from '../../../assets/teamData/teams.json'

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {

  @Input() game
  @Input() teams
  @Input() scores

  constructor(private router: Router) { }

  ngOnInit() {
  }

  formatDateAndTime(iso) {
    return moment(iso).local().format('dddd, MMM Do h:mm A')
  }

  scoreClass(away, home) {
    return away < home 
  }

  navigatePage(team) {
    const findTeamName = teamData.find(t => t.abbr === team);
    this.router.navigate([`/team/${findTeamName.name.toLowerCase().split(/\s/).join('')}`])
  }

}
