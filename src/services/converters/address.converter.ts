import { Address } from 'src/app/models/address.model';

export class AddressConverter {
  toModel(external: any): Address {
    const model = new Address();
    model.street = external.street;
    model.number = external.number;
    model.neighborhood = external.neighborhood;
    model.city = external.city;
    model.state = external.state;
    model.lat = external.lat;
    model.lng = external.lng;

    return model;
  }

  toModels(externals: any): Array<Address> {
    const models = [];

    if ( !externals ) {
        return models;
    }

    for (let i = 0; i < externals.length; i++) {
        models.push(this.toModel(externals[i]));
    }

    return models;
  }

  toExternal(address: Address): any {
    const external = {
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      lat: address.lat,
      lng: address.lng
    };

    return external;
  }
}
