import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formGroup: FormGroup

  constructor(public formBuilder: FormBuilder) {
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
}
