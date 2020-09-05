import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { DOCUMENT } from '@angular/common'
import { HttpService } from '../../http.service'

import teamJson from '../../../assets/teamData/teams.json';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teamName:String = ''
  teamAbbr
  teamData
  coach
  teamId:String = ''
  schedule
  byeWeek = ''
  winLossRecord
  loading = false
  year = "2020"

  constructor(
    private router: ActivatedRoute, 
    private http: HttpService,
    private redirect: Router,
    @Inject(DOCUMENT) document
  ) { }

  ngOnInit() {
    this.router.params.subscribe(p => {
      const validate = this.checkUrlParam(p.teamId)

      document.querySelector('.nav-bar').scrollIntoView(true)

      if (validate) {
        this.loading = true

        this.teamName = p.teamId
        this.getTeam(this.teamId);
        this.getSchedule(this.teamId, this.year)

        this.loading = false
      } else {
        this.redirect.navigate(['/404'])
      }
    });
  }

  checkUrlParam(param) {
    const match = teamJson.find(t => t.name.toLowerCase().split(/\s/).join('') === param);

    if (match) {
      this.teamId = match.name;
      this.teamAbbr = match[param].abbr
      return true
    } else {
      return false
    }
  }

  yearSelecter(e) {
    this.getSchedule(this.teamId, e.target.value)
  }

  getTeam(team) {
    this.http.getTeams().subscribe((data:any) => {
      let t = data.find(t => t.Name.toLowerCase() === team)
      this.teamData = t;
      //this.getCoach(t.teamId)
    })
  }

  getCoach(team) {
    this.http.getCoachByTeam(team).subscribe(data => {
      this.coach = data
    })
  }
  
  getSchedule(team, year) {
    this.http.getScheduleByTeamAndYear(team, year).subscribe((data:any) => {

      const schedule = data.filter(game => game.AwayTeam === this.teamAbbr || game.HomeTeam === this.teamAbbr);

      const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      const bye = [];

      schedule.forEach((s, i) => {
        if (s.Week !== weeks[i]) {
          bye.push(weeks[i])
        }
      })

      schedule.splice(bye[0] - 1, 0, { Week: "BYE", weekNum: bye[0] })
      this.schedule = schedule;
      this.byeWeek = bye[0];
    })
  }

  getScoresForWinLoss(name) {
    this.http.getStandings("2019", "REG").subscribe((data:any) => {
    const team = data.teamStandings.find(t => t.team.nick.toLowerCase() === name)
    
    this.winLossRecord = `${team.standing.overallWins}-${team.standing.overallLosses}-${team.standing.overallTies}`
    })
  }
}
