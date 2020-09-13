import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service'

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  weeks = Array(17).fill(1).map((x,i)=>i + 1);
  activeWeek = 1
  currentYear = 2020
  scores = []

  constructor(private http: HttpService,) { }

  ngOnInit() {
    this.currentWeek()

  }

  changeWeek(week) {
    this.activeWeek = week;
    this.currentWeekScores(week, this.currentYear)
  }

  currentWeek() {
    this.http.getCurrentWeek().subscribe((data:any) => {
      this.activeWeek = data;
      this.currentWeekScores(data, this.currentYear);
    })
  }

  currentWeekScores(week, year) {
    this.http.getScoresByWeek(week, year).subscribe((data:any) => {
      this.scores = data
    });
  }

  yearSelecter(e) {
    const year = parseInt(e.target.value)
    this.currentYear = year
    this.currentWeekScores(this.activeWeek, year)
  }
}

