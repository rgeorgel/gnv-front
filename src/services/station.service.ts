import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { StationConverter } from './converters/station.converter';
import { Station } from 'src/app/models/station.model';

@Injectable()
export class StationService {

    constructor(private http: Http) { }

    handleError(error: any): Promise<any> {
        if (!environment.production) {
            console.error('An error occurred', error);
        }

        return Promise.reject(error.message || error);
    }

    get() {
        return this.http.get(environment.urlServer + '/station')
        .toPromise()
        .then((res: Response) => {
            const body = res.json();
            const converter = new StationConverter();

            return converter.toModels(body);
        })
        .catch(this.handleError);
    }

    getByState(state: string) {
        return this.http.get(environment.urlServer + `/station/find-by-state?state=${state}`)
        .toPromise()
        .then((res: Response) => {
            const body = res.json();
            const converter = new StationConverter();

            return converter.toModels(body);
        })
        .catch(this.handleError);
    }

    save(station: Station) {
        const converter = new StationConverter();
        const _body = converter.toExternal(station);

        return this.http.post(environment.urlServer + '/station', _body)
        .toPromise()
        .then((res: Response) => {
            const body = res.json();
            return converter.toModel(body);
        })
        .catch(this.handleError);
    }
}
