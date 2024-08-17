import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';

interface Filmes{
  id:number;
  nome:string;
  duracao:number;
  lancamento:number;
  autor:string;
  orcamento:number;
  categoria:any;
}

@Component({
  selector: 'app-filmes-lista',
  standalone: true,
  imports: [
    FormsModule, //formsModule faz a ligação entre campo - classe ou seja faz a conexão DOM das propriedades
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    MenubarModule 
    
  ],
  templateUrl: './filmes-lista.component.html',
  styleUrl: './filmes-lista.component.css'
})
export class FilmesListaComponent {

    filmes: Array<Filmes> = [];
    carregandoFilmes: boolean = false;
    httpClient: HttpClient;

    categorias = [
      {"id": "Terror","nome":"Terror"},
      {"id":"Suspense","nome":"Suspense"},
      {"id": "Ação", "nome":"Ação"},
    ]

    nome:string = "";
    duracao:number = 0;
    lancamento:string = "";
    autor:string = "";
    orcamento:number = 0;
    categoria:any = "";
    visible: boolean = false;

    constructor(httpCliente:HttpClient){
      this.httpClient = httpCliente;
    }

    ngOnInit(){//essa ação faz carregar automaticamente quando carrega a pagina o método escolhido
      this.consultar();
    }

    consultar(){
      this.carregandoFilmes = true;
      this.httpClient.get<Array<Filmes>>("http://localhost:3000/filmes").subscribe(x => this.aposConsultar(x));
    }

    aposConsultar(dados: Array<Filmes>){
      this.filmes = dados;//Lista de filmes recebe dados que é a lista.
      this.carregandoFilmes = false;
    }

    apagar(id:number){//aqui estamos apagando o item da lista
      this.httpClient.delete(`http://localhost:3000/filmes/${id}`).subscribe(x => this.apagouRegistro());
    }
    apagouRegistro(){
      this.consultar();//Aqui estamos atualizando a tela após apagar o item da lista
    }

    salvar(){
      let dados = {
        nome: this.nome,
        duracao: this.duracao,
        autor: this.autor,
        lancamento: this.lancamento,
        orcamento: this.orcamento,
        categoria: this.categoria["nome"]
      }
      this.httpClient.post("http://localhost:3000/filmes", dados)
      .subscribe(x => this.aposSalvar(x));
    }
    aposSalvar(x:any){
      this.limparCampos();
      this.consultar();
      this.visible = false;
    }

    limparCampos(){
      this.nome = "";
      this.duracao = 0;
      this.autor = "";
      this.lancamento = "";
      this.orcamento = 0;
      this.categoria = "";
    }
    editar(){

    }
    showDialog(){
      this.visible = true;
    }
}
