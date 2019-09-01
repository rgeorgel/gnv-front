import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListStationPage } from './list-station.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListStationPage
      }
    ])
  ],
  declarations: [
    ListStationPage,
  ],
  entryComponents: [
  ]
})
export class ListStationPageModule {}
