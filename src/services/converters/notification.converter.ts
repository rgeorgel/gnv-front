import { Notification } from 'src/app/models/notification.model';

export class NotificationConverter {
  toModel(external: any): Notification {
    const model = new Notification();
    model.type = external.type;
    model.stationId = external.stationId;
    model.date = external.date;

    return model;
  }

  toExternal(notification: Notification): any {
    const external = {
      type: notification.type,
      stationId: notification.stationId,
      date: notification.date
    };

    return external;
  }
}
