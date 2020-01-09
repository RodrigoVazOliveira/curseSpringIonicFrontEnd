import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';


@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {

    }

    findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number = 24) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImageFromBucket(id: string) {
        let url = `${API_CONFIG.bucket}/prod${id}-small.jpg`;
        return this.http.get(url, {responseType: `blob`});
    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/${id}`);
    }

    getImageFromBucket(id: string) {
        let url = `${API_CONFIG.bucket}/prod${id}.jpg`;
        return this.http.get(url, {responseType: `blob`});
    }
}