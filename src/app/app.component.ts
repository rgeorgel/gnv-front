import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Tela inicial',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Buscar um posto',
      url: '/map',
      icon: 'pin'
    },
    {
      title: 'Simular economia',
      url: '/simulation',
      icon: 'logo-usd'
    },
    {
      title: 'Adicionar posto',
      url: '/add-station',
      icon: 'build'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
