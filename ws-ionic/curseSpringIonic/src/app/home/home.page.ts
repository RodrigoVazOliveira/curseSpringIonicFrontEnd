import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public credenciais: CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(public navCtrl: NavController, 
      public menu: MenuController,
      public auth: AuthService) {

  }


  login() {
    this.auth.authenticate(this.credenciais).
    subscribe(
    result => {
      this.auth.successfulLogin(result.headers.get('Authorization'));
      this.navCtrl.navigateRoot('/categorias');
    },
    error => {
      //console.log(error);
    });

  }

  ionViewWillEnter() {
    
    this.menu.enable(false);

  }

  ionViewDidEnter() {
    this.auth.refreshToken().
    subscribe(
    result => {
      this.auth.successfulLogin(result.headers.get('Authorization'));
      this.navCtrl.navigateRoot('/categorias');
    },
    error => {
      //console.log(error);
    });
  }

  ionViewDidLeave() {
     this.menu.enable(true);
  }

  signUp() {
    this.navCtrl.navigateForward('/signup');
  }

}
