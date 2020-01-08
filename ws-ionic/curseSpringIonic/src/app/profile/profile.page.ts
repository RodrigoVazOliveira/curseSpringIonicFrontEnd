import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ClienteDTO } from '../models/cliente.dto';
import { ClienteService } from '../services/domain/cliente.service';
import { API_CONFIG } from '../config/api.config';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(public storage: StorageService,
    public clienteService: ClienteService,
    public navCtrl: NavController,
    public camera: Camera) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    this.loadDataView();

  }

  loadDataView() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe( response => {
        this.cliente = response as ClienteDTO;
        this.getImageIfExists();
      }, 
      error => {
        if (error.status == 403) { 
          this.navCtrl.navigateBack('/home');
        }
      });
    }
    else {
    this.navCtrl.navigateBack('/home');
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

  getPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false;
    }, (err) => {

    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture).subscribe(
      response => {
        this.picture = null;
        this.loadDataView();
      },error => {

      }
    );
  }

  cancelPicture() {
    this.picture = null;
  }
 
}
