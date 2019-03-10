import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

import { Station } from 'src/app/models/station.model';
import { Address } from 'src/app/models/address.model';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  station: Station = new Station();
  currentAddress: Address = new Address();
  notificationService: NotificationService;

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private launchNavigator: LaunchNavigator,
    notificationService: NotificationService,
  ) {
    this.notificationService = notificationService;
  }

  ngOnInit() {
    this.station = JSON.parse(sessionStorage.getItem('show-station'));
    this.currentAddress = JSON.parse(sessionStorage.getItem('current-address'));
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  openWaze() {
    this.launchApp(this.currentAddress, this.station, 'waze');
  }

  openGoogle() {
    this.launchApp(this.currentAddress, this.station, 'google_maps');
  }

  launchApp(start: Address, destination: Station, app: string): void {
    const options: LaunchNavigatorOptions = {
      start: [Number(start.lat), Number(start.lng)],
      app: app
    };

    this.launchNavigator.navigate([Number(destination.lat), Number(destination.lng)], options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

  getName(): string {
    return this.station.name;
  }
  getAddress(): string {
    return `${this.station.number},
            ${this.station.street}, ${this.station.neighborhood},
            ${this.station.city} - ${this.station.state}`;
  }

  stationNotExist(stationId: number) {
    if (confirm('Confirma que o posto não existe?')) {

      const notification = new Notification();
      notification.type = 1;
      notification.stationId = stationId;

      this.notificationService.send(notification)
        .then((response: Notification) => {
          alert('Notificação cadastrada com sucesso!');
        });
    }
  }
}
