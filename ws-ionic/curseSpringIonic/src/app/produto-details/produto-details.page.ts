import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from './../services/domain/produto.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoDTO } from '../models/produto.dto';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-produto-details',
  templateUrl: './produto-details.page.html',
  styleUrls: ['./produto-details.page.scss'],
})
export class ProdutoDetailsPage implements OnInit {

  item: ProdutoDTO;

  constructor(private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    
    this.activatedRoute.queryParams.subscribe(

      response => {
        
        this.produtoService.findById(response['id']).subscribe(
          response => {
            this.item = response;
            this.loadImageItem();
          },
          error => {}
        );
        console.log(response);
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

}
