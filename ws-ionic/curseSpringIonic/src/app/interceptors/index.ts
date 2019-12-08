import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error-interceptor';
import { AuthINterceptor } from './auth-interceptor';

export const httpInterceptorProviders = [
  
  { provide: HTTP_INTERCEPTORS, useClass: AuthINterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

];