import { Routes } from '@angular/router';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { FilmesListaComponent } from './filmes-lista/filmes-lista.component';
import { FilmeEditarComponent } from './filme-editar/filme-editar.component';

export const routes: Routes = [//Aqui é criado as rotas para quando clicar em alguma opção carregar tal página específica
    {"path": "produtos", component: ProdutoListaComponent},
    {"path": "clientes", component: ClienteListaComponent},
    {"path": "filmes", component: FilmesListaComponent},
    //O :id quer dizer que na URL terá um parâmetro, os ":" quer dizer que isso será um parâmetro
    {"path": "filmes/:id", component: FilmeEditarComponent}
];
