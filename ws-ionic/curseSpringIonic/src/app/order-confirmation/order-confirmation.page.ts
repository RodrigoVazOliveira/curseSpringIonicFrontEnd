import { EnderecoDTO } from './../models/endereco.dto';
import { ClienteDTO } from './../models/cliente.dto';
import { CartService } from './../services/domain/CartService';
import { CartItem } from './../models/cart-item';
import { ActivatedRoute } from '@angular/router';
import { PedidoDTO } from './../models/pedido.dto';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/domain/cliente.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public activatedRoute: ActivatedRoute,
              public cartService: CartService,
              public clienteService: ClienteService,
              public navCtrl: NavController) {

    this.activatedRoute.queryParams.subscribe(
      response => {
        this.pedido = response['pedido'];
      }
    );

   }

  checkout() {
    console.log(this.pedido);
  }

  ionViewDidEnter(){
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id).subscribe(
      response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findAddress(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      }, error => {
        this.navCtrl.navigateForward('/home');
      }
    );



  }

  private findAddress(id: string, list: EnderecoDTO[]): EnderecoDTO {

    let position = list.findIndex(x => x.id = id);

    return list[position];

  }

  total() {
    return this.cartService.total();
  }

}
