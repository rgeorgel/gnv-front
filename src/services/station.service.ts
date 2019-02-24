import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { StationConverter } from './converters/station.converter';

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
}
