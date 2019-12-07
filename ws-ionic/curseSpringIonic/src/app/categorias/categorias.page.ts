import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/domain/categoria.service';
import { CategoriaDTO } from '../models/categoria.dto';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  itens: CategoriaDTO[];
  bucketUrl: String;

  constructor(public service : CategoriaService) { 
    this.bucketUrl = `${API_CONFIG.bucket}`;
  }



  ngOnInit() {
  }

  ionViewDidEnter() {
    this.service.findAll()
    .subscribe((response) => {

      this.itens = response;

    },
    (error) => {});

  }

}
