import { Injectable } from '@angular/core';
import {  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService,
    public alertCtrl: AlertController) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
       catchError((error) => {

        let errorApi = error.error;

        if (errorApi) {
          switch(error.status) {

            case 403:
              this.handle403();
              break;
            case 401:
              this.handle401();
              break;
            
            default:
              this.handleDefaultError(errorApi);
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

  async handle401() {
    const alert = await this.alertCtrl.create({
      header: 'Autenticação',
      subHeader: 'Erro de autenticação',
      message: 'E-Mail ou senha incorreta',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async handleDefaultError(errorObj) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: `Status: ${errorObj.status} Erro: ${errorObj.error}`,
      message: errorObj.message,
      buttons: ['Ok']
    });

    await alert.present();
  }

}