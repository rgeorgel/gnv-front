import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { StationService } from '../../services/station.service';
import { Station } from '../models/station.model';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: any;
  stations: Array<Station> = [];

  stationService: StationService;
  constructor(
    stationService: StationService,
    public geolocation: Geolocation) {
    this.stationService = stationService;
  }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.initMap(res.coords.latitude, res.coords.longitude);
      this.getStations();
    });
  }

  initMap(lat, lnt) {
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
      }

    })
    .catch(() => {
      console.log('Oops, nao foi possivel carregar os postos');
    });
  }
}
