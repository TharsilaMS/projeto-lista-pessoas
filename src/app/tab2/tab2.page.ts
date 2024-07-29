import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule, ViewDidEnter, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Pessoa } from '../model/Pessoa';
import { PessoaService } from '../services/PessoaService';
import { Router } from '@angular/router';
import { Subscription, distinctUntilChanged, debounceTime } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormPessoaComponent } from '../form-pessoa/form-pessoa.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule, ReactiveFormsModule]
})
export class Tab2Page implements ViewDidEnter, OnInit, OnDestroy {

  pessoas: Pessoa[] = []
  loading: boolean = false;
  isToastOpen: boolean = false;
  filterForm: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private pessoaService: PessoaService, private router: Router, private toastController: ToastController, private loadingCtrl: LoadingController, private fb: FormBuilder, private modalCtrl: ModalController
  ) {
    this.filterForm = this.fb.group({
      nome: ['']
    });
  }
  editar(pessoa: Pessoa) {
    this.router.navigate(['tabs/tab1', pessoa.email])
  }

  ionViewDidEnter(): void {
    this.listar()
  }
  async listar() {
    this.loading = true;

    try {
      const data = await this.pessoaService.listar();
      if (data) {
        this.pessoas = data;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.loading = false;
    }
  }

  async deletar(pessoa: Pessoa) {
    const deletado = await this.pessoaService.delete(pessoa.email)
    if (deletado) {
      this.listar()
      const toast = await this.toastController.create({
        message: 'Pessoa deletada com sucesso',
        duration: 1500,
        position: 'top'
      });
      await toast.present();
    }
  }
  async filtrar(nome: string) {
    const pessoas = await this.pessoaService.findByNome(nome)
    this.pessoas = pessoas
  }
  ngOnInit(): void {
    const sub = this.filterForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => this.filtrar(value.nome!))
    this.subscriptions.push(sub)
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
  async criarNovo() {
    const modal = await this.modalCtrl.create({
      component: FormPessoaComponent,
      componentProps: { modal: true }
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'close') {
      this.listar()
    }
  }

}

