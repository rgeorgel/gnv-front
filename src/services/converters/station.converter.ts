import { Station } from 'src/app/models/station.model';

export class StationConverter {
  toModel(external: any): Station {
    const model = new Station();
    model.id = external.id;
    model.name = external.name;
    model.street = external.street;
    model.number = external.number;
    model.neighborhood = external.neighborhood;
    model.city = external.city;
    model.state = external.state;
    model.lat = external.lat;
    model.lng = external.lng;

    return model;
  }

  toModels(externals: any): Array<Station> {
    const models = [];

    if ( !externals ) {
        return models;
    }

    for (let i = 0; i < externals.length; i++) {
        models.push(this.toModel(externals[i]));
    }

    return models;
  }

  toExternal(station: Station): any {
    const external = {
      id: station.id,
      name: station.name,
      street: station.street,
      number: station.number,
      neighborhood: station.neighborhood,
      city: station.city,
      state: station.state,
      lat: station.lat,
      lng: station.lng
    };

    return external;
  }
}
