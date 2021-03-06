import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StationService } from 'src/services/station.service';
import { GoogleService } from 'src/services/google.services';
import { NotificationService } from 'src/services/notification.service';
import { NavigationModalComponent } from './shared/natigation-modal/natigation-modal.component';


@NgModule({
  declarations: [
      AppComponent,
      NavigationModalComponent,
  ],
  entryComponents: [
    NavigationModalComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,

    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    NativeGeocoder,
    StationService,
    NotificationService,
    GoogleService,
    AdMobFree,
    GoogleAnalytics,
    LaunchNavigator,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
