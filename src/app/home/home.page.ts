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
    response => {
      console.log(response);
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.navigateForward('/categorias');
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
      response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.navigateForward('/categorias');
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
