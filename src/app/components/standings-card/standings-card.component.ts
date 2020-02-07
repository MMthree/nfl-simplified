import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-standings-card',
  templateUrl: './standings-card.component.html',
  styleUrls: ['./standings-card.component.scss']
})
export class StandingsCardComponent implements OnInit {
  @Input('title') title: string; 

  constructor() { }

  ngOnInit() {
  }

}
