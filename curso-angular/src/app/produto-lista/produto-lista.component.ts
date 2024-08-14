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
  nome: string = 'TV Tubalão';

  nomeProduto: string = '';

  produtos: Array<string> = [
    // "iPhone 14",
    // "Motorole G7",
    // "Xiaomi 9",
    // "Nokia"
  ]

  cadastrarProduto(){
    //Verifica se o produto está cadastrado
    let existeProduto = this.produtos.some(x => x === this.nomeProduto);
    if(existeProduto === true){
      alert('Produto já cadastrado')
      return;
    }
    if(this.nomeProduto === ""){
      alert('Nome não pode ser vazio')
      return;
    }
    //Cadastra o produto que o usuário preencheu no input na lista de produtos. 
    this.produtos.push(this.nomeProduto);
    //Limpar o campo
    this.nomeProduto = "";
  }
  apagarProduto(nomeProduto:string){
    let indiceProduto = this.produtos.findIndex(x => x === nomeProduto);
    console.log(indiceProduto);

    this.produtos.splice(indiceProduto, 1);
  }
}
