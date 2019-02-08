import { Injectable } from '@angular/core';
import { ApiService } from './core/services/api/api.service';

@Injectable()
export class AppService {

    constructor(
        private api: ApiService
    ) { }
}