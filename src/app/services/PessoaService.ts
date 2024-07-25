import { Injectable } from '@angular/core';
import { DatabaseService } from '../services/DatabaseService';
import { Pessoa } from '../model/Pessoa';
const PESSOAS_KEY = "pessoas"
@Injectable({providedIn: 'root'})
export class PessoaService {
constructor(private databaseService: DatabaseService) { }
async criar(pessoa: Pessoa) {
const pessoas = await this.listar()
if(pessoas) {
pessoas.push(pessoa)
this.databaseService.set(PESSOAS_KEY, pessoas)
}else {
this.databaseService.set(PESSOAS_KEY, [pessoa])
}
}
listar(): Promise<Pessoa[] | null> {
return this.databaseService.get<Pessoa[]>(PESSOAS_KEY)
}
async editar(pessoa: Pessoa, email: string) {
    const pessoas = await this.listar()
    if(pessoas) {
    const index = pessoas.findIndex(pessoa => pessoa.email === email);
    if(index >= 0) {
    pessoas.splice(index, 1, pessoa);
    this.databaseService.set(PESSOAS_KEY, pessoas)
    }
    }
    }
}