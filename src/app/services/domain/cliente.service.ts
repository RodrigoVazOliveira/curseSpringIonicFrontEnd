import { ImageUtilService } from './../image-util.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from 'src/app/models/cliente.dto';
import { API_CONFIG } from 'src/app/config/api.config';
import { StorageService } from '../storage.service';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, 
        public storage: StorageService,
        public imageUtilSErvice: ImageUtilService) {

    }

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email:string) {

        return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
        
    }


    getImageFromBucket(id:string) : Observable<any> {
        
        let url = `${API_CONFIG.bucket}/cp${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});

    }

    insert(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }


    uploadPicture(picture) {
        let pictureBlob = this.imageUtilSErvice.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(`${API_CONFIG.baseUrl}/clientes/picture`, 
        formData,
        {
            observe: 'response',
            responseType: 'text'
        });
    }

}