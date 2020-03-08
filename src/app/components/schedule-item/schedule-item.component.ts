import { Component, OnInit, Input } from '@angular/core';

import moment from 'moment';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent implements OnInit {

  @Input() game
  @Input() teams
  @Input() scores

  constructor() { }

  ngOnInit() {
    
  }

  formatDateAndTime(iso) {
    return moment(iso).local().format('dddd, MMM Do h:mm A')
  }

  scoreClass(away, home) {
    return away < home 
  }

}
