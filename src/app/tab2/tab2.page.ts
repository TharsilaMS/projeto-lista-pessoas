import { Component } from '@angular/core';
import {IonicModule, ViewDidEnter} from '@ionic/angular'
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Pessoa } from '../model/Pessoa';
import {PessoaService} from '../services/PessoaService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})
export class Tab2Page implements ViewDidEnter  {

pessoas: Pessoa[]=[] 

constructor(private pessoaService: PessoaService, private router: Router) {}
editar(pessoa: Pessoa) {
this.router.navigate(['tabs/tab1', pessoa.email])
}

ionViewDidEnter(): void {
  this.listar()
}
listar() {
  this.pessoaService.listar().then((data) => {
    if (data) {
      this.pessoas = data;
    }
  }).catch((error) => {
    console.error(error);
  });
}

}

