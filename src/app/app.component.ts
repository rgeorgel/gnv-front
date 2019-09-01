import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AdMobFreeBannerConfig, AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

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
      title: 'Ver postos no mapa',
      url: '/map',
      icon: 'pin'
    },
    // {
    //   title: 'Simular economia',
    //   url: '/simulation',
    //   icon: 'logo-usd'
    // },
    {
      title: 'Adicionar posto',
      url: '/add-station',
      icon: 'build'
    },
    {
      title: 'Lista de postos',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private admobFree: AdMobFree,
    private ga: GoogleAnalytics,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.ga.startTrackerWithId('UA-137187379-1')
        .then(() => {})
        .catch(e => console.log('Error starting GoogleAnalytics == ' + e));
    });

    this.setAds();
  }

  setAds(): void {
    this.platform.ready().then(() => {
      const admobid = {
        banner: 'ca-app-pub-2452858859242368/9428178902',
        interstitial: 'ca-app-pub-2452858859242368/2279304865',

        isTesting: false
      };

      const bannerConfig: AdMobFreeBannerConfig = {
        isTesting: admobid.isTesting,
        autoShow: false,
        id: admobid.banner
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare()
        .then(() => {
          this.admobFree.banner.show();
        })
        .catch(e => {
          console.log('================>');
          console.log('================>');
          console.log(e);
          console.log('<================');
          console.log('<================');
        });


      const interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: admobid.isTesting,
        autoShow: false,
        id: 'ca-app-pub-2452858859242368/2279304865'
      };
      this.admobFree.interstitial.config(interstitialConfig);

      this.admobFree.interstitial.prepare()
        .then(() => {
          setTimeout(() => {
            this.admobFree.interstitial.show();
          }, 10000);
        })
        .catch(e => {
          console.log('----------------->');
          console.log('----------------->');
          console.log(e);
          console.log('<-----------------');
          console.log('<-----------------');
        });
    });
  }
}
