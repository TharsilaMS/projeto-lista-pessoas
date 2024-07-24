import { Component } from '@angular/core';
import { IonicModule , AlertController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from'@angular/forms';
import { DatabaseService } from '../services/DatabaseService';
@Component({
selector: 'app-tab1',
templateUrl: 'tab1.page.html',
styleUrls: ['tab1.page.scss'],
standalone: true,
imports: [IonicModule, ExploreContainerComponent, ReactiveFormsModule],
})
export class Tab1Page {
formGroup: FormGroup = this.fb.group({
nome: ['', Validators.required],
telefone: [''],
email: ['', Validators.email],
hobie: ['']
})
constructor(private fb: FormBuilder , private databaseservice: DatabaseService , private alertController: AlertController ) { }
async salvar() {
  if (this.formGroup.valid) {
  this.databaseservice.set("pessoa", JSON.stringify(this.formGroup.value))
  const alert = await this.alertController.create({
  header: 'Item salvo',
  message: 'Item salvo com sucesso',
  buttons: ['OK'],
  })
  await alert.present()
  } else {
  alert('Formulário inválido')
  }
  }
}
