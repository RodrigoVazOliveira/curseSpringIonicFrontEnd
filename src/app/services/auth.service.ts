import { CartService } from './domain/CartService';
import { Injectable } from '@angular/core';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { localUser } from '../models/local.user';
import { StorageService } from './storage.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()

export class AuthService {

    jwtHelper = new JwtHelperService();

    constructor(public http: HttpClient,
            public storage: StorageService,
            public cartService: CartService) {

    }

    authenticate(creds: CredenciaisDTO) {

        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response',
                responseType: 'text'
            } 
        );

    }   

    successfulLogin(authorizationValue: string) {

        let tok = authorizationValue.substring(7);
        let user: localUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        }

        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout() {

        this.storage.setLocalUser(null);

    }

    
    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}