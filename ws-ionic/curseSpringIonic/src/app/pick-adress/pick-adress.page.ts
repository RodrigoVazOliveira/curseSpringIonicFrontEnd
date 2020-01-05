import { EnderecoDTO } from './../models/endereco.dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-adress',
  templateUrl: './pick-adress.page.html',
  styleUrls: ['./pick-adress.page.scss'],
})
export class PickAdressPage implements OnInit {

  items: EnderecoDTO[];

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.items =  [
      {
        id :"1",
        logradouro: "Rua quinze de Novembro",
        numero: "300",
        complemento: "Santa Mônica",
        bairro: "Uberlândia",
        cep: "1234567",
        cidade : {
          id : "1",
          nome : "Uberlândia",
          estado : {
            id : "1",
            nome : "Minas Gerais"
          }
        }
      },
      {
        id :"1",
        logradouro: "Rua dezesseis de Dezembro",
        numero: "301",
        complemento: "Santa Mônica",
        bairro: "Uberlândia",
        cep: "8910112",
        cidade : {
          id : "1",
          nome : "Uberlândia",
          estado : {
            id : "1",
            nome : "Minas Gerais"
          }
        }
      }
    ];
    
  }
}
