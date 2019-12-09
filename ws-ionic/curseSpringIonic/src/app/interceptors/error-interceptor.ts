import { Injectable } from '@angular/core';
import {  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
       catchError((error) => {

        let errorApi = error.error;

        if (errorApi) {

          switch(errorApi.status) {

            case 403:
              this.handle403();
              break;

          }
          return throwError(errorApi);
        }

        return throwError(error);
       })
    );

  }

  handle403() {

    // limpar o storageLocal
    this.storage.setLocalUser(null);

  }

  handle404() {

  }
}