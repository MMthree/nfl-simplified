import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import moment from 'moment-timezone';
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
  @Input() showWeek

  constructor(private router: Router) { }

  ngOnInit() {
  }

  formatDateAndTime(iso) {
    const timezone =  moment.tz.guess();
    const newYork = moment.tz(iso, "America/New_York");
    const local = newYork.clone().tz(timezone)
    
    return local.format('dddd, MMM Do h:mm A z')
  }

  scoreClass(away, home) {
    return away < home 
  }

  navigatePage(team) {
    const findTeamName = teamData.find(t => t.abbr === team);
    this.router.navigate([`/team/${findTeamName.name.toLowerCase().split(/\s/).join('')}`])
  }

}
