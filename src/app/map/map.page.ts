import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { StationService } from '../../services/station.service';
import { Station } from '../models/station.model';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { NavigationModalComponent } from '../shared/natigation-modal/natigation-modal.component';
import { Address } from '../models/address.model';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free/ngx';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;
  stations: Array<Station> = [];
  currentPosition: Address = new Address();
  @ViewChild('map') mapElement: ElementRef;

  myPopup: any;
  lat: any;
  lng: any;

  stationService: StationService;
  constructor(
    stationService: StationService,
    public geolocation: Geolocation,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private zone: NgZone,
    private ga: GoogleAnalytics,
    private platform: Platform,
    private admobFree: AdMobFree,
  ) {
    this.stationService = stationService;
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.getLocation();

      this.prepareAds();

      this.ga.trackView('Map Page');
      this.ga.trackEvent('track', 'Map Page', 'Map Page');
    });
  }

  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 0
    };
    this.geolocation.getCurrentPosition(options).then((res) => {
      this.currentPosition.lat = String(res.coords.latitude);
      this.currentPosition.lng = String(res.coords.longitude);

      this.initMap(res.coords.latitude, res.coords.longitude);
      this.getStations();
    });
  }

  initMap(lat: number, lnt: number) {
    const position = new google.maps.LatLng(lat, lnt);

    const mapOptions = {
      zoom: 12,
      center: position
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  getStations() {
    this.stationService.get()
    .then((stations: Array<Station>) => {
      this.stations = stations;
      console.log(this.stations);
      for (let i = 0; i < this.stations.length; i++) {
        const station = this.stations[i];

        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(station.lat, station.lng),
          map: this.map,
          title: station.name,
        });

        this.setMarkerClickable(marker, station);
      }

    })
    .catch(() => {
      console.log('Oops, nao foi possivel carregar os postos');
    });
  }

  setMarkerClickable(marker: any, station: Station): void {
    marker.addListener('click', () => {
      this.zone.run(() => {
        this.openModal(station);
      });
    });
  }

  async openModal(station: Station) {
    sessionStorage.setItem('show-station', JSON.stringify(station));
    sessionStorage.setItem('current-address', JSON.stringify(this.currentPosition));
    const modal = await this.modalCtrl.create({
     component: NavigationModalComponent,
     componentProps: station
   });

   return await modal.present();
  }

  prepareAds(): void {
    const admobid = {
      interstitial: 'ca-app-pub-2452858859242368/2279304865',
      isTesting: false
    };

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
        console.log(e);
        console.log('<-----------------');
      });
  }
}
