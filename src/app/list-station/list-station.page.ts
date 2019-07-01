import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Station } from '../models/station.model';
import { Address } from '../models/address.model';
import { StationService } from 'src/services/station.service';
import { NavigationModalComponent } from '../shared/natigation-modal/natigation-modal.component';

declare var google;

@Component({
  selector: 'app-list-station',
  templateUrl: 'list-station.page.html',
  styleUrls: ['list-station.page.scss']
})
export class ListStationPage implements OnInit {

  state: string;
  filterBy: string;
  loading: any;
  stations: Array<Station> = [];
  currentPosition: Address = new Address();
  stationService: StationService;

  constructor(
    stationService: StationService,
    public geolocation: Geolocation,
    private modalCtrl: ModalController,
    private ga: GoogleAnalytics,
    public loadingController: LoadingController
  ) {
    this.stationService = stationService;
  }

  ngOnInit() {
    this.getLocation();

    this.ga.trackView('List Station Page');
    this.ga.trackEvent('track', 'List Station Page', 'List Station Page');

    this.prepareLoading();
  }

  async prepareLoading() {
    this.loading = await this.loadingController.create({ message: 'Carregando...' });
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
    });
  }

  getStations() {
    this.loading.present();

    this.stationService.getByState(this.state)
    .then((stations: Array<Station>) => {
      this.loading.dismiss();

      this.stations = stations;
      for (let i = 0; i < this.stations.length; i++) {
        const station = this.stations[i];

        // const marker = new google.maps.Marker({
        //   position: new google.maps.LatLng(station.lat, station.lng),
        //   map: this.map,
        //   title: station.name,
        // });

        // this.setMarkerClickable(marker, station);
      }

    })
    .catch(() => {
      this.loading.dismiss();
      console.log('Oops, nao foi possivel carregar os postos');
    });
  }

  getAddress(station: Station): string {
    return `${station.street}, ${station.number} ${station.neighborhood} - ${station.city} - ${station.state}`;
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
}
