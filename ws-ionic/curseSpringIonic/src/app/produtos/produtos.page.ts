import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../models/produto.dto';
import { ProdutoService } from '../services/domain/produto.service';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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
        console.log(response);
        this.itens = response['content'];
      },
      error => {
        
      }
    );

 
  }

}
