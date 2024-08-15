import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css'
})
export class ProdutoListaComponent {

  nomeProduto: string = '';
  indiceAlterar:number = -1;
  mensagemErro:string = "";
  tituloBotaoSalvarProduto:string ='Cadastrar';

  produtos: Array<string> = [
    "iPhone 14",
    "Motorole G7",
    "Xiaomi 9",
    "Nokia"
  ]

  salvarProduto(){
    this.mensagemErro = '';

    if(this.nomeProduto.length < 3){
      this.mensagemErro = "Nome não pode possuir menos de 3 caracteres";
      return;
    }
    //Verifica se o produto está cadastrado
    let existeProduto = this.produtos.some(x => x === this.nomeProduto);

    if(existeProduto === true){
      this.mensagemErro = `Produto já cadastrado com o nome ! '${this.nomeProduto}'`;
      return;
    }
    if(this.indiceAlterar === -1){
      this.produtos.push(this.nomeProduto);
    }
    else{
      //alterar o nome do produto que o usuário escolheu para editar
      this.produtos[this.indiceAlterar] = this.nomeProduto;
      //reset para o usuario cadastrar novamente
      this.indiceAlterar = -1;
      //reset o texto do botão para cadastrar, para que o usuário saiba que está cadastrando um produto
      this.tituloBotaoSalvarProduto = "Cadastrar";
    }
    //Limpar o campo
    this.nomeProduto = "";
  }
  apagarProduto(nomeProduto:string){
    let indiceProduto = this.produtos.findIndex(x => x === nomeProduto);
    console.log(indiceProduto);

    this.produtos.splice(indiceProduto, 1);
  }

  editarProduto(nomeProduto:string){

    this.indiceAlterar = this.produtos.findIndex(x => x === nomeProduto);
    console.log(this.indiceAlterar);
    this.nomeProduto = nomeProduto;
    this.tituloBotaoSalvarProduto = 'Editar';
  }
}
