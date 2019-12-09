import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ClienteDTO } from '../models/cliente.dto';
import { ClienteService } from '../services/domain/cliente.service';
import { API_CONFIG } from '../config/api.config';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;

  constructor(public storage: StorageService,
    public clienteService: ClienteService,
    public navCtrl: NavController) { }

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
        error => {
          if (error.status == 403) 
            this.navCtrl.navigateRoot('/home');
        });
      }
      else
      this.navCtrl.navigateRoot('/home');

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
