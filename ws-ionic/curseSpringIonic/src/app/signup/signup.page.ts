import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../services/domain/cidade.service';
import { EstadoService } from '../services/domain/estado.service';
import { EstadoDTO } from '../models/estado.dto';
import { CidadeDTO } from '../models/cidade.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public formBuilder: FormBuilder, 
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {
    this.formGroup = this.formBuilder.group({
      nome: [
        'Joaquim',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120)
        ]
       ],
       email: [
         'joaquim@exemplo.com.br',[
           Validators.required, 
          Validators.email
        ]
       ],
       tipo: [
         '1', [
           Validators.required
         ]
       ],
       cpfOuCpnj: [
         '22248638027', [
           Validators.required, 
           Validators.minLength(11), 
           Validators.maxLength(14)
         ]
       ],
       senha: [
         '123',[
           Validators.required
         ]
       ],
       logradouro: [
         'Rua Egidio',[
           Validators.required
         ]
       ],
       numero: [
         '123',[
           Validators.required
         ]
       ],
       complemento: [
         'APTO 1',
         []
       ],
       bairro: [
         'Copacabana', [
           Validators.required
         ]
       ],
       cep: [
         '10828333', [
           Validators.required
         ]
       ],
       telefone1: [
         '977261827', [
           Validators.required
         ]
       ],
       telefone2: [
        '', []
      ],
      telefone3: [
        '', []
      ],
      estadoId: [
        null, [
          Validators.required
        ]
      ],
      CidadeId: [
        null, [
          Validators.required
        ]
      ]
    });
   }

  ngOnInit() {
  }


  signupUser() {
    console.log('Enviou o formulário');
  }

  updateCidades() {
    let estadoId = this.formGroup.controls.estadoId.value;
    this.cidadeService.findAll(estadoId)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.CidadeId.setValue(0);
    },
    error => {});
  }

  ionViewDidEnter() {
    this.estadoService.findAll()
    .subscribe(
      response => {
        this.estados = response;
        console.log(this.estados);
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => { }
    );
  }

 
}
