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
  teamData = {}
  coach = {}
  teamId:String = ''
  schedule = [];
  byeWeek = ''


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
        this.teamName = p.teamId
        this.getTeam(p.teamId);
        this.getSchedule(this.teamId)
      } else {
        this.redirect.navigate(['/404'])
      }
    });
  }

  checkUrlParam(param) {
    const match = teamJson.find(t => t.name === param);

    if (match) {
      this.teamId = match[param].abbr;
      return true
    } else {
      return false
    }
  }

  getTeam(team:string) {
    this.http.getTeams().subscribe(data => {
      let d
      d = data;
      let t = d.teams.find(t => t.nick.toLowerCase() === team.toLowerCase())
      this.teamData = t;
      this.getCoach(t.teamId)
    })
  }

  getCoach(team) {
    this.http.getCoachByTeam(team).subscribe(data => {
      this.coach = data
    })
  }
  
  getSchedule(team) {

    this.http.getScheduleByTeamAndYear(team).subscribe(data => {

      const REG = data['gameScores'].filter(t => t.gameSchedule.seasonType === "REG");

      const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      const bye = [];

      REG.forEach((s, i) => {
        if (s.gameSchedule.week !== weeks[i]) {
          bye.push(weeks[i])
        }
      })

      REG.splice(bye[0] - 1, 0, { gameSchedule: {week: "BYE", weekNum: bye[0]} })

      this.schedule = REG;
      this.byeWeek = bye[0];
    })
  }
}
