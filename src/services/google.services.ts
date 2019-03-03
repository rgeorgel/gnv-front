import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { AddressConverter } from './converters/address.converter';
import { Address } from 'src/app/models/address.model';
import { GoogleConverter } from './converters/google.converter';

@Injectable()
export class GoogleService {

    constructor(private http: Http) { }

    handleError(error: any): Promise<any> {
        if (!environment.production) {
            console.error('An error occurred', error);
        }

        return Promise.reject(error.message || error);
    }

    getLatLngByAddress(address: Address) {
        const converter = new GoogleConverter();
        const addressStr = `${address.number}, ${address.street} ${address.neighborhood} ${address.city} ${address.state}`;

        return this.http.get(
            `https://maps.googleapis.com/maps/api/geocode/json?key=${environment.googleMapsApiKey}&address=${addressStr}`)
        .toPromise()
        .then((res: Response) => {
            const body = res.json();

            if (body.results.length > 0) {
                return converter.getGeoCode(body.results[0]);
            } else {
                throw Promise.reject('Erro ao obter o endereço');
            }
        })
        .catch(this.handleError);
    }
}
