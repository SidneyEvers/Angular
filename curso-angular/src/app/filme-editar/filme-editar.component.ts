import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

interface Filme{
  id:number;
  nome:string;
  duracao:number;
  lancamento:number;
  autor:string;
  orcamento:number;
  categoria:any;
}

@Component({
  selector: 'app-filme-editar',
  standalone: true,
  imports: [ProgressSpinnerModule,
  FormsModule,
  ButtonModule,
  TableModule,
  DialogModule,
  InputTextModule,
  InputNumberModule,
  CalendarModule,
  DropdownModule,
  MenubarModule,
  ToastModule,
  ConfirmDialogModule ],
  templateUrl: './filme-editar.component.html',
  styleUrl: './filme-editar.component.css',
  providers: [MessageService,ConfirmationService]
})
export class FilmeEditarComponent {
  protected carregandoFilme: boolean = false;
  private id: string | null = null;
  protected filme: Filme | null = null;

  categorias = [
    {"id": "Terror","nome":"Terror"},
    {"id":"Suspense","nome":"Suspense"},
    {"id": "Ação", "nome":"Ação"},
  ]


  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient ){
    //this.router.navigate(["/filmes"]);
  }

  ngOnInit(){
    // Obter da rota atual(URL) o parâmetro ID
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.consultar();
  }

  consultar(){
    this.carregandoFilme = true;
    this.httpClient.get<Filme>(`http://localhost:3000/filmes/${this.id}`).subscribe(x => {
      this.carregandoFilme = false;
      this.filme = x;
      console.log(x)
  });
  }
  salvar(){
    let dados = {
      nome: this.filme?.nome,
      duracao: this.filme?.duracao,
      autor: this.filme?.autor,
      lancamento: this.filme?.lancamento,
      orcamento: this.filme?.orcamento,
      categoria: this.filme?.categoria["nome"]
    }
    this.httpClient.put(`http://localhost:3000/filmes/${this.id}`, this.filme).subscribe(x => this.router.navigate(["/filmes"]));
  }
}
