import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoDTO } from '../models/produto.dto';
import { ProdutoService } from '../services/domain/produto.service';
import { NavController, LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { API_CONFIG } from '../config/api.config';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  itens: ProdutoDTO[] = [];
  loading = null;
  page: number = 0;

  constructor(private produtoService: ProdutoService, 
              private activedRoute: ActivatedRoute,
              private navCtrl: NavController,
              private LoadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  loadImageUrls(start : number, end : number) {

    for (let i = start; i < end; i++) {
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
    this.loadDataView();    
  }

  loadDataView() {
    let categoria_id : string;
    this.presentLoading();
    this.activedRoute.queryParams.subscribe(
      response => {
        categoria_id = response['categoria_id'];
      }
    );
    this.produtoService.findByCategoria(categoria_id, this.page, 10).subscribe(
      response => {
        let start = this.itens.length;
        this.itens = this.itens.concat(response['content']);
        let end = this.itens.length - 1;
        this.loadImageUrls(start, end);
        this.loading.dismiss();

      },
      error => { 
        this.loading.dismiss();
      }
    );
  }

  showDetail(id: string) {
    this.navCtrl.navigateForward('/produto-details', {
      queryParams: {
        id: id
      }
    });
  }

  async presentLoading() {
    this.loading = await this.LoadingCtrl.create({
      message: 'Aguarde....'
    });
    await this.loading.present();
    //const { role, data } = await loading.onDidDismiss();

  }

  
  doRefresh(event) {
    this.page = 0;
    this.itens = [];
    this.loadDataView();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadData(event) {
    this.page++;
    this.loadDataView();
    setTimeout(() => {
      event.target.complete();
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 1000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
