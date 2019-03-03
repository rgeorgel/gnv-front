import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { StationService } from 'src/services/station.service';
import { Station } from '../models/station.model';

declare var google;

@Component({
  selector: 'app-add-station-map',
  templateUrl: './add-station-map.page.html',
  styleUrls: ['./add-station-map.page.scss'],
})
export class AddStationMapPage implements OnInit {

  map: any;
  stationService: StationService;
  station: Station = new Station();

  constructor(
    stationService: StationService,
    private router: Router,
    private _location: Location,
  ) {
    this.stationService = stationService;
  }

  ngOnInit() {
    this.station = JSON.parse(sessionStorage.getItem('new-station'));

    this.initMap(this.station.lat, this.station.lng);
    this.addMarker(this.station);
  }

  initMap(lat: string, lnt: string) {
    const position = new google.maps.LatLng(lat, lnt);

    const mapOptions = {
      zoom: 17,
      center: position
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  addMarker(station: Station) {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(station.lat, station.lng),
      map: this.map,
      title: station.name,
    });
  }

  save() {
    this.stationService.save(this.station)
      .then(() => {
        this.router.navigateByUrl('home');
      });
  }

  back() {
    this._location.back();
  }
}
