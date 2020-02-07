import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  sideNav:Boolean = false;

  constructor(private router: Router) { 
  }

  ngOnInit() {
  }

  getLocation() {
    return this.router.navigateByUrl('/')
  }

  toggleSideNav() {
    this.sideNav = !this.sideNav;
    console.log(this.sideNav)
  }

}
