import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { ApiService } from '../core/services/api/api.service';
import { BaseCrudService } from '../core/services/base/base-crud.service';

@Injectable()
export class ConsultasService extends BaseCrudService<any> {

    constructor(
        public api: ApiService,
    ) {
        super(api, 'Consulta');
    }

    ObterNumeroDaProximaConsultaParaCriar(): Observable<number> {
        return this.api.get(`Consulta/GetNextId`);
    }
    ObterRelatores(): Observable<Array<string>> {
        return this.api.get(`Consulta/ObterRelatores`);
    }
    ObterJurisdicionados(): Observable<Array<string>> {
        return this.api.get(`Consulta/ObterJurisdicionados`);
    }
    ObterDatasDePublicacao(): Observable<Array<string>> {
        return this.api.get(`Consulta/ObterDatasDePublicacao`);
    }
    ObterTiposDeDecisao(): Observable<Array<string>> {
        return this.api.get(`Consulta/ObterTiposDeDecisao`);
    }

    BuscarPorNumero(numero?: string): Observable<Array<any>> {
        return this.api.get(`Consulta/Busca?value=Numero&content=${numero}`);
    }

    BaixarDocumento(id: string): void {
        window.open(`${environment.webApiBaseUrl}Consulta/GetFile?guid=${id}`);
    }
}
