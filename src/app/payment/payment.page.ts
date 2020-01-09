import { PedidoDTO } from './../models/pedido.dto';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;
  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10];

  formGroup : FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public navCtrl: NavController
  ) { 

    activatedRoute.queryParams.subscribe(
      response => {
        console.log(response);
        this.pedido = response['pedido'];
      }
    );


    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    });

  }

  ngOnInit() {

  }
  
  ionViewDidEnter(){
   
  }

  nextpage() {
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.navigateRoot('/order-confirmation', {
      queryParams: {
        pedido: this.pedido
      }
    });
  }

}
