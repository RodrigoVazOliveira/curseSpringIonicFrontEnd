import { PedidoDTO } from './../../models/pedido.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';

@Injectable()
export class PedidoService {

    constructor(public http: HttpClient) {

    }

    // inserindo um pedido no banco de dados
    insert(obj: PedidoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, obj, {
            observe: 'response',
            responseType: 'text'
        });
    }

}