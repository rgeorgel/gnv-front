import { Address } from 'src/app/models/address.model';

export class GoogleConverter {
  getGeoCode(external: any): Address {
    const model = new Address();

    model.lat = external.geometry.location.lat;
    model.lng = external.geometry.location.lng;

    return model;
  }
}
