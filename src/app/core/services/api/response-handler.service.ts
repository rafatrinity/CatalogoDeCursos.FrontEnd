import { Injectable } from '@angular/core';
import { Response, ResponseContentType } from '@angular/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ResponseHandlerService {

    constructor() { }

    handleSuccess(response: Response, responseType: ResponseContentType): any {
        switch (responseType) {
            case ResponseContentType.Json:
                try {
                    return response.json();
                } catch (error) {
                    return {};
                }
            case ResponseContentType.Blob:
                return response.blob();
            default:
                return response.text();
        }
    }
    handleError(response: Response): Observable<any> {
        let error: any;

        if (response.status == 401) {
            error = {
                unauthorized: true
            };
        } else if (response.status === 400 || response.status === 404) {
            const responseError = response.json();

            if (responseError) {
                error = responseError;
            } else {
                error = this.getDefaultErrorObject();
            }
        } else {
            error = this.getDefaultErrorObject();
        }

        return throwError(error);
    }

    private getDefaultErrorObject(): any {
        return {
            title: 'ECG TCE-RJ',
            message: 'Encontramos uma falha interna ao realizar esta operação.'
        };
    }

}
