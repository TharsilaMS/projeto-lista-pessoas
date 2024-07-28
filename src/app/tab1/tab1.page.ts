import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PessoaService } from '../services/PessoaService';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, ReactiveFormsModule],
})
export class Tab1Page   {

  formGroup: FormGroup;
  emailToEdit: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private alertController: AlertController,
    private activedRouter: ActivatedRoute 
  ) {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      telefone: [''],
      email: ['', Validators.email],
      hobie: ['']
    });
  }

  async salvar() {
    if (this.formGroup.valid) {
      if (this.emailToEdit) {
        await this.pessoaService.editar(this.formGroup.value, this.emailToEdit);
      } else {
        await this.pessoaService.criar(this.formGroup.value);
      }
      const alert = await this.alertController.create({
        header: 'Item salvo',
        message: 'Item salvo com sucesso',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Formulário inválido',
        message: 'Formulário inválido',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  

  ionViewDidEnter(): void {
    this.emailToEdit = null
    const email = this.activedRouter.snapshot.paramMap.get("email");
    if(email) {
    console.log(email)
    this.pessoaService.get(email).then(pessoa => {
    if(pessoa) {
    this.formGroup.patchValue(pessoa)
    this.emailToEdit = email
    }
    })
    }
    }
    
}
