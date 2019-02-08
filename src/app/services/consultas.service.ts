import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiService } from '../core/services/api/api.service';
import { BaseCrudService } from '../core/services/base/base-crud.service';

@Injectable()
export class ConsultasService extends BaseCrudService<any> {

    constructor(public api: ApiService, ) {
        super(api, 'cursos');
    }

    ObterProfessores(): Observable<Array<any>> {
        return this.api.get(`/Professores`);
    }

    ObterCursos(): Observable<Array<any>> {
        return this.api.get('/cursos');
    }

    ObterPublico(): Observable<Array<any>> {
        return this.api.get('/Publico');
    }
    ObterEixo(): Observable<Array<any>> {
        return this.api.get('/Eixo');
    }

    ObterMetodologia(): Observable<Array<any>> {
        return this.api.get('/Metodologias');
    }

    ObterTurmas(): Observable<Array<any>> {
        return this.api.get('/turmas')
    }

    ObterEventos(): Observable <Array<any>>{
        return this.api.get('./Evento');
    }

}
