import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../models/produto.dto';

@Component({
  selector: 'app-produto-details',
  templateUrl: './produto-details.page.html',
  styleUrls: ['./produto-details.page.scss'],
})
export class ProdutoDetailsPage implements OnInit {

  item: ProdutoDTO[];

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.item = {
      id: "1",
      nome: "Mouse",
      preco: 80.59
    }
  }

}
