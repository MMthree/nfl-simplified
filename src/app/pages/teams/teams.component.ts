import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
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


  constructor(
    private router: ActivatedRoute, 
    private http: HttpService,
    private redirect: Router
  ) { }

  ngOnInit() {
    this.router.params.subscribe(p => {
      const validate = this.checkUrlParam(p.teamId)

      if (validate) {
        this.teamName = p.teamId
        this.getTeam(p.teamId)
      } else {
        this.redirect.navigate(['/404'])
      }
    });

    this.http.getScheduleByTeamAndYear()
  }

  checkUrlParam(param) {
    const match = teamJson.find(t => t.name === param);

    if (match) {
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
      console.log(t)
      this.getCoach(t.teamId)
    })
  }

  getCoach(team) {
    this.http.getCoachByTeam(team).subscribe(data => {
      this.coach = data
      console.log(data)
    })
  }
}
