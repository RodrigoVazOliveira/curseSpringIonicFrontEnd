import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ClienteDTO } from '../models/cliente.dto';
import { ClienteService } from '../services/domain/cliente.service';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  constructor(public storage: StorageService,
    public clienteService: ClienteService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

      let localUser = this.storage.getLocalUser();

      if (localUser && localUser.email) {
        this.clienteService.findByEmail(localUser.email)
        .subscribe( response => {
          this.cliente = response;
          this.getImageIfExists();
        }, 
        error => {});
      }

  }

  getImageIfExists() {

    
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(
      response => {
        this.cliente.imageUrl = `${API_CONFIG.bucket}/cp${this.cliente.id}.jpg`;
      },
      error => {

      }
    );


  }



}
