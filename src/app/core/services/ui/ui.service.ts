import { Injectable } from '@angular/core';

import { AlertService } from './../alert/alert.service';
// import { NotifyService } from './../notify/notify.service';

@Injectable()
export class UiService {

  constructor(
    public alert: AlertService,
    // public notify: NotifyService
  ) {}

}
