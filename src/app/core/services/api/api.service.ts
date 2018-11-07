import { Headers, Http, Request, RequestMethod, ResponseContentType, URLSearchParams } from '@angular/http';
import { ResponseHandlerService } from './response-handler.service';
import { environment } from '../../../../environments/environment';
import { KeyValuePair } from '../../classes/key-value-pair';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable()
export class ApiService {
  baseUrl: string = environment.webApiBaseUrl;

  constructor(
    private http: Http,
    private responseHandler: ResponseHandlerService,
  ) {}

  get(url: string, query?: KeyValuePair[], headers?: Headers, fullUrl?: Boolean, responseType?: ResponseContentType, autoMapResponse?: boolean, withCredentials?: boolean): Observable<any> {
    return this.sendRequest(
      this.buildUrl(url, fullUrl),
      RequestMethod.Get,
      query,
      null,
      headers,
      responseType,
      autoMapResponse,
      withCredentials
    );
  }
  post(url: string, data: any, headers?: Headers, fullUrl?: Boolean, responseType?: ResponseContentType, autoMapResponse?: boolean, withCredentials?: boolean): Observable<any> {
    return this.sendRequest(
      this.buildUrl(url, fullUrl),
      RequestMethod.Post,
      null,
      data,
      headers,
      responseType,
      autoMapResponse,
      withCredentials
    );
  }
  put(url: string, data: any, headers?: Headers, fullUrl?: Boolean, responseType?: ResponseContentType, autoMapResponse?: boolean, withCredentials?: boolean): Observable<any> {
    return this.sendRequest(
      this.buildUrl(url, fullUrl),
      RequestMethod.Put,
      null,
      data,
      headers,
      responseType,
      autoMapResponse,
      withCredentials
    );
  }
  delete(url: string, data?: any, headers?: Headers, fullUrl?: Boolean, responseType?: ResponseContentType, autoMapResponse?: boolean, withCredentials?: boolean): Observable<any> {
    return this.sendRequest(
      this.buildUrl(url, fullUrl),
      RequestMethod.Delete,
      null,
      data,
      headers,
      responseType,
      autoMapResponse,
      withCredentials
    );
  }

  private sendRequest(url: string , method: RequestMethod, query: KeyValuePair[], body: any, headers: Headers, responseType?: ResponseContentType, autoMapResponse?: boolean, withCredentials?: boolean): Observable<any> {
    let requestBody: any = body;
    let responseContentType = ResponseContentType.Json;
    let canAutoMapResponse = true;
    let useCredentials = true;

    if (responseType != null) {
      responseContentType = responseType;
    }

    if (autoMapResponse != null) {
      canAutoMapResponse = autoMapResponse;
    }

    if (withCredentials != null) {
      useCredentials = withCredentials;
    }

    if (body instanceof Object) {
      requestBody = this.getJson(body);
    }

    const request = new Request({
      method: method,
      url: url,
      params: this.getQueryStringParams(query),
      body: requestBody,
      headers: headers || this.buildRequestHeaders(),
      withCredentials: useCredentials,
      responseType: responseContentType
    });

    return this.http.request(request)
      .pipe(
        map(response => {
          if (canAutoMapResponse) {
            return this.responseHandler.handleSuccess(response, responseContentType);
          }
          
          return response;
        }),
        catchError(reason => {
          if (canAutoMapResponse) {
            return this.responseHandler.handleError(reason);
          }

          return throwError(reason);
        })
      );
  }
  private getQueryStringParams(query: KeyValuePair[]): URLSearchParams {
    if (query == null) {
      return null;
    }

    const params: URLSearchParams = new URLSearchParams();

    query.forEach(x => {
      params.set(x.Key, x.Value);
    });

    return params;
  }
  private getJson(data: any): string {
    if (data == null) {
      return null;
    }
    return JSON.stringify(data);
  }
  private buildRequestHeaders(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');

    // if (this.authService.user) {
    //   const token = this.authService.getAuthorizationHeaderValue();
    //   headers.append('Authorization', token);
    // }
    
    return headers;
  }
  private buildUrl(url: string, fullUrl: Boolean): string {
    if (!fullUrl) {
      return this.baseUrl + `${url}`;
    } else {
      return url;
    }    
  }
}
