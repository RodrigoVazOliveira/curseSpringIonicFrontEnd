import { EnderecoDTO } from './../models/endereco.dto';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';

@Component({
  selector: 'app-pick-adress',
  templateUrl: './pick-adress.page.html',
  styleUrls: ['./pick-adress.page.scss'],
})
export class PickAdressPage implements OnInit {

  items: EnderecoDTO[];

  constructor(public storage: StorageService,
              public clienteService: ClienteService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {

    const localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
        this.clienteService.findByEmail(localUser.email)
        .subscribe( response => {
          this.items = response['enderecos'];
        },
        error => {
          if (error.status == 403) { 
            this.navCtrl.navigateBack('/home');
          }
        });
      } else {
      this.navCtrl.navigateBack('/home');
      }


  }
}
