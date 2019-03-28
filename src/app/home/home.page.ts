import { Component, OnInit } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private ga: GoogleAnalytics,
  ) { }

  ngOnInit() {
    this.ga.trackView('Home Page');
    this.ga.trackEvent('track', 'Home Page', 'Home Page');
  }
}
