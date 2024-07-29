import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, ViewDidEnter } from '@ionic/angular';
import { FormPessoaComponent } from '../form-pessoa/form-pessoa.component';
import { PessoaService } from '../services/PessoaService';
@Component({
selector: 'app-tab1',
templateUrl: 'tab1.page.html',
styleUrls: ['tab1.page.scss'],
standalone: true,
imports: [IonicModule, FormPessoaComponent],
})
export class Tab1Page implements ViewDidEnter {
@ViewChild(FormPessoaComponent)
FormPessoaComponent!: FormPessoaComponent
constructor(
private pessoaService: PessoaService,
private activedRouter: ActivatedRoute) { }
ionViewDidEnter(): void {
this.FormPessoaComponent.emailToEdit = null
const email = this.activedRouter.snapshot.paramMap.get("email");
if (email) {
console.log(email)
this.pessoaService.get(email).then(pessoa => {
if (pessoa) {
this.FormPessoaComponent.formGroup.patchValue(pessoa)
this.FormPessoaComponent.emailToEdit = email
}
})
}
}
}
