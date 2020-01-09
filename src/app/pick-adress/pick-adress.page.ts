import { CartService } from './../services/domain/CartService';
import { PedidoDTO } from './../models/pedido.dto';
import { EnderecoDTO } from './../models/endereco.dto';
import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pick-adress',
  templateUrl: './pick-adress.page.html',
  styleUrls: ['./pick-adress.page.scss'],
})
export class PickAdressPage implements OnInit {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(public storage: StorageService,
              public clienteService: ClienteService,
              public cartService: CartService,
              public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {

    const localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
        this.clienteService.findByEmail(localUser.email)
        .subscribe( response => {
          this.items = response['enderecos'];
          
          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            items: cart.items.map(x => {
              return {
                quantidade: x.quantidade,
                produto: {id: x.produto.id}
              }
            })
          }
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

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.navCtrl.navigateForward('/payment', {
      queryParams: {
        pedido: this.pedido
      }
    });
  }
}
