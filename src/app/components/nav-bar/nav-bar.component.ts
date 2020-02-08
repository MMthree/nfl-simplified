import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  opened:Boolean = false;

  constructor(private router: Router) { 
  }

  ngOnInit() {
  }

  getLocation() {
    return this.router.navigateByUrl('/')
  }

  toggleSideNav() {
    this.opened = !this.opened;
    console.log(this.opened)
  }

}
