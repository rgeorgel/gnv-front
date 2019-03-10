import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { NotificationConverter } from './converters/notification.converter';
import { Notification } from 'src/app/models/notification.model';

@Injectable()
export class NotificationService {

    constructor(private http: Http) { }

    handleError(error: any): Promise<any> {
        if (!environment.production) {
            console.error('An error occurred', error);
        }

        return Promise.reject(error.message || error);
    }

    send(notification: Notification) {
        const converter = new NotificationConverter();
        const _body = converter.toExternal(notification);

        return this.http.post(environment.urlServer + '/notification', _body)
        .toPromise()
        .then((res: Response) => {
            const body = res.json();
            return converter.toModel(body);
        })
        .catch(this.handleError);
    }
}
