import { Component, OnInit } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.page.html',
  styleUrls: ['./simulation.page.scss'],
})
export class SimulationPage implements OnInit {

  constructor(
    private ga: GoogleAnalytics,
  ) { }

  ngOnInit() {
    this.ga.trackView('Simulation Page');
    this.ga.trackEvent('track', 'Simulation Page', 'Simulation Page');
  }

}
