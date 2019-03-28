import { Component, OnInit, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { StationService } from '../../services/station.service';
import { Station } from '../models/station.model';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { Address } from '../models/address.model';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

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
  ) {
    this.stationService = stationService;
  }

  ngOnInit() {
    this.getLocation();

    this.ga.trackView('Map Page');
    this.ga.trackEvent('track', 'Map Page', 'Map Page');
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

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
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
     component: ModalComponent,
     componentProps: station
   });

   return await modal.present();
  }
}
