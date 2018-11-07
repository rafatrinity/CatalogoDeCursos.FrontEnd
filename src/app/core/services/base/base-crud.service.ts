import { Observable } from 'rxjs';

import { ApiService } from '../api/api.service';

export class BaseCrudService<T> {
    private _baseUrl: string

    constructor(
        public api: ApiService,
        controller: string
    ) {
        this._baseUrl = controller;
    }

    ObterTodos(): Observable<Array<T>> {
        return this.api.get(this._baseUrl);
    }

    ObterPorId(id: any): Observable<T> {
        return this.api.get(`${this._baseUrl}/${id}`);
    }

    Criar(entity: T): Observable<T> {
        return this.api.post(this._baseUrl, entity);
    }

    Atualizar(entity: T): Observable<void> {
        return this.api.put(`${this._baseUrl}`, entity);
    }

    Excluir(id: any): Observable<void> {
        return this.api.delete(`${this._baseUrl}/${id}`);
    }

}
