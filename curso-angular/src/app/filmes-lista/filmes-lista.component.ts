import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

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
    MenubarModule,
    ToastModule,
    ConfirmDialogModule 
    
  ],
  templateUrl: './filmes-lista.component.html',
  styleUrl: './filmes-lista.component.css',
  providers: [MessageService,ConfirmationService]
})
export class FilmesListaComponent {

    filmes: Array<Filmes> = [];
    carregandoFilmes: boolean = false;
    

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

    constructor(private httpClient:HttpClient,private messageService: MessageService, private confirmationService: ConfirmationService,
      private router: Router){

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

    apagar(filme:Filmes){//aqui estamos apagando o item da lista
      this.confirmationService.confirm({
        
        //target: event.target as EventTarget,
        message: `Tem certeza que deseja apagar '${filme.nome}'?`,
        header: 'Cuidado',
        icon: 'pi pi-exclamation-triangle',
        // acceptIcon:"none",
        // rejectIcon:"none",
        acceptLabel:"Sim",
        rejectLabel:"Não",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Filme apagado com sucesso' });
            this.httpClient.delete(`http://localhost:3000/filmes/${filme.id}`).subscribe(x => this.apagouRegistro());
        },
        reject: () => {
            this.messageService.add({ severity: 'error', detail: 'Seu filme não foi apagdo', life: 3000 });
        }
    });      
    }


    apagouRegistro(){
      this.consultar();//Aqui estamos atualizando a tela após apagar o item da lista
      this.messageService.add({ /*severity põe a cor no alerta*/severity: 'success', summary: 'Sucesso', detail: 'Registro deletado com sucesso' });
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
    editar(id:number){
      
      this.router.navigate([`/filmes/${id}`])
    }
    showDialog(){
      this.visible = true;
    }
    }
