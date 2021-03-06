import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StationService } from 'src/services/station.service';
import { Station } from '../models/station.model';
import { Address } from '../models/address.model';
import { GoogleService } from 'src/services/google.services';
import { Router } from '@angular/router';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.page.html',
  styleUrls: ['./add-station.page.scss'],
})
export class AddStationPage implements OnInit {

  name: any;
  street: any;
  number: any;
  neighborhood: any;
  city: any;
  state: any;

  public myForm: any;
  messageName = '';
  messageStreet = '';
  messageNumber = '';
  messageNeighborhood = '';
  messageCity = '';
  messageState = '';

  errorName = false;
  errorStreet = false;
  errorNumber = false;
  errorNeighborhood = false;
  errorCity = false;
  errorState = false;

  stationService: StationService;
  googleService: GoogleService;

  constructor(
    formBuilder: FormBuilder,
    stationService: StationService,
    googleService: GoogleService,
    private router: Router,
    private ga: GoogleAnalytics,
  ) {
    this.stationService = stationService;
    this.googleService = googleService;

    this.myForm = formBuilder.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.ga.trackView('Add-Station Page');
    this.ga.trackEvent('track', 'Add-Station', 'Add-Station');
  }

  isValid(): boolean {
    const controls = this.myForm.controls;

    let valid = true;

    if (!this.myForm.valid) {
      valid = false;
      if (!controls.name.valid) {
        this.errorName = true;
        this.messageName = 'Ops! Nome inválido';
      } else {
        this.messageName = '';
      }

      if (!controls.street.valid) {
        this.errorStreet = true;
        this.messageStreet = 'Ops! Rua inválida';
      } else {
        this.messageStreet = '';
      }

      if (!controls.number.valid) {
        this.errorNumber = true;
        this.messageNumber = 'Ops! Numero inválido';
      } else {
        this.messageNumber = '';
      }

      if (!controls.neighborhood.valid) {
        this.errorNeighborhood = true;
        this.messageNeighborhood = 'Ops! bairro inválido';
      } else {
        this.messageNeighborhood = '';
      }

      if (!controls.city.valid) {
        this.errorCity = true;
        this.messageCity = 'Ops! cidade inválido';
      } else {
        this.messageCity = '';
      }

      if (!controls.state.valid) {
        this.errorState = true;
        this.messageState = 'Ops! estado inválido';
      } else {
        this.messageState = '';
      }
    }

    return valid;
  }

  getAddress(): Address {
    const controls = this.myForm.controls;

    const address = new Address();
    address.city = controls.city.value;
    address.neighborhood = controls.neighborhood.value;
    address.number = controls.number.value.toString();
    address.state = controls.state.value;
    address.street = controls.street.value;

    return address;
  }

  save() {
    if (!this.isValid()) {
      console.log('Tem erro!');
      return;
    }

    const controls = this.myForm.controls;
    const address = this.getAddress();

    this.googleService.getLatLngByAddress(address)
      .then((latLng: Address) => {
        const station = new Station();
        station.lat = latLng.lat;
        station.lng = latLng.lng;
        station.city = address.city;
        station.name = controls.name.value;
        station.neighborhood = address.neighborhood;
        station.number = address.number;
        station.state = address.state;
        station.street = address.street;

        sessionStorage.setItem('new-station', JSON.stringify(station));

        this.router.navigateByUrl('add-station-map');
      });
  }

  saveBulk() {
    const stations = [];

    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];

      console.log('index:', i);
      console.log('station', station);
      console.log('prepare', this.prepare(station));
    }
  }

  async prepare(base) {
    const station: Station = new Station();

    try {
      const parts = base.endereco.split(',');
      const parts2 = parts[1].split('-');

      station.name = base.nome;
      station.street = parts[0].trim();
      station.number = parts2[0].trim();
      station.neighborhood = parts2[1].trim();
      station.city = parts2.length > 3 ? parts2[2].trim() : 'São Paulo';

      await this.googleService.getLatLngByAddress(station)
      .then((latLng: Address) => {
        const _station = new Station();
        _station.lat = latLng.lat;
        _station.lng = latLng.lng;
        _station.city = station.city;
        _station.name = station.name;
        _station.neighborhood = station.neighborhood;
        _station.number = station.number;
        _station.state = station.state;
        _station.street = station.street;

        this.stationService.save(_station);
      });

    } catch (ex) {
      console.log('====> base:', base, ex);
    }

    return station;
  }
}
