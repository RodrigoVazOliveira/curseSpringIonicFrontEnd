import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../models/produto.dto';
import { ProdutoService } from '../services/domain/produto.service';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  itens: ProdutoDTO[];


  constructor(public produtoService: ProdutoService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  loadImageUrls() {

    for (let i = 0; i < this.itens.length; i++) {
      let item = this.itens[i];
      this.produtoService. getSmallImageFromBucket(item.id).subscribe(
        response => {
          item.imageUrl = `${API_CONFIG.bucket}/prod${item.id}-small.jpg`;
        },
        error => {
          
        }
      );
    }

  }


  ionViewDidEnter() {

    let categoria_id : string;

    this.activedRoute.queryParams.subscribe(
      response => {
        categoria_id = response['categoria_id'];
      }
    );

    console.log(categoria_id);

    this.produtoService.findByCategoria(categoria_id).subscribe(
      response => {
        this.itens = response['content'];
        this.loadImageUrls();
      },
      error => {
        
      }
    );

 
  }



}
