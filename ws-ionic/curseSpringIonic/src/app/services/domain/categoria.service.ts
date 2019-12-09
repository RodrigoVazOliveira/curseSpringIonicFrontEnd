import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from 'src/app/models/categoria.dto';
import { Observable } from 'rxjs';

@Injectable()

export class CategoriaService {

    constructor(public http: HttpClient) {

    }


    findAll() : Observable<CategoriaDTO[]> {
       return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categoriass`);    
    }

}