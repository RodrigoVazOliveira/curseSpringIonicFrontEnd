import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../models/produto.dto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

  itens: ProdutoDTO[];


  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.itens = [
      {
        id: '1',
        nome: 'Mouse',
        preco: 80.99
      },
      {
        id: '2',
        nome: 'Teclado',
        preco: 100.00
      }
    ]
  }

}
