import { ProdutoService } from './../services/domain/produto.service';
import { CartService } from './../services/domain/CartService';
import { CartItem } from './../models/cart-item';
import { Component, OnInit } from '@angular/core';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(public cartService: CartService,
    public produtoService: ProdutoService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){

    let cart = this.cartService.getCart();

    this.items = cart.items;
    this.loadImageUrls();


  }

  loadImageUrls() {

    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(
        response => {
          item.produto.imageUrl = `${API_CONFIG.bucket}/prod${item.produto.id}-small.jpg`;
        },
        error => {
          
        }
      );
    }

  }
}
 