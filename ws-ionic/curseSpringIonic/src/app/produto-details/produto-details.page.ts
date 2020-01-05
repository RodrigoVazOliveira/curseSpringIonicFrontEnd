import { CartService } from './../services/domain/CartService';
import { ProdutoDTO } from './../models/produto.dto';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../services/domain/produto.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../models/produto.dto';
import { API_CONFIG } from '../config/api.config';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-produto-details',
  templateUrl: './produto-details.page.html',
  styleUrls: ['./produto-details.page.scss'],
})
export class ProdutoDetailsPage implements OnInit {

  item: ProdutoDTO;

  constructor(public produtoService: ProdutoService,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController,
    public cartService: CartService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    
    this.activatedRoute.queryParams.subscribe(

      response => {
        
        this.produtoService.findById(response['id']).subscribe(
          response => {
            console.log(response);
            this.item = response;
            this.loadImageItem();
          },
          error => {}
        );
      },
      error => {}

    );

  }


  loadImageItem() {

    this.produtoService.getImageFromBucket(this.item.id).subscribe(
      response => {
        this.item.imageUrl = `${API_CONFIG.bucket}/prod${this.item.id}.jpg`
      },
      error => {}
    );

  }


  addToCart(produto: ProdutoDTO) {

    this.cartService.addProduto(produto);
    this.navCtrl.navigateForward('/cart');
    
  }
}
