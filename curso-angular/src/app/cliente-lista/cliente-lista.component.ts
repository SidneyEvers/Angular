import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-lista',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-lista.component.html',
  styleUrl: './cliente-lista.component.css'
})
export class ClienteListaComponent {
  nomeClienteInput:string = '';
  indiceAlterar:number = -1;
  mensagemErroCliente:string = "";

  clientes: Array<string> = [
    "Bruno",
    "André",
    "Sidney"
  ];

  salvarCliente(){
    let existeCliente = this.clientes.some(x => x === this.nomeClienteInput);
  
    if(existeCliente === true){
      this.mensagemErroCliente = `Cliente já possui cadastro! ${this.nomeClienteInput}`
      return;
    }
    if(this.nomeClienteInput === ""){
      this.mensagemErroCliente = "Campo não pode ser vazio!"
      return;
    }

    if(this.indiceAlterar === -1){
      //Aqui estamos adicionando o cliente no array --> pegando pelo input = "nomeClienteInput" feito no HTML.  
        this.clientes.push(this.nomeClienteInput);
        console.log(this.clientes);

        this.mensagemErroCliente = "Cliente cadastrado com sucesso!"
        this.nomeClienteInput = '';
    }
    else{
      this.clientes[this.indiceAlterar] = this.nomeClienteInput;

      this.indiceAlterar = -1;
      this.nomeClienteInput = '';
    }
  }

  apagarCliente(cliente:string){
    //Aqui estamos procurando qual a posição do array é para ser excluída.
    let acharIndex = this.clientes.findIndex(x => x === cliente);
    console.log(acharIndex);
    //Aqui estamos excluindo essa posição do array do array, no caso o splice pega o "acharIndex" que possui a posição localizacada acima no clicar e apaga uma posição dali. 
    this.clientes.splice(acharIndex, 1);
  }

  editarCliente(nomeCliente:string){
    //Aqui estamos achando qual é o indice ou seja posição do Array de qual estamos selecionando
    this.indiceAlterar = this.clientes.findIndex(x => x === nomeCliente)
    console.log(this.indiceAlterar);
    //Aqui estamos deixando o campo de Input "nomeCliente" recebendo o nome do cliente que acabamos de selecionar. 
    this.nomeClienteInput = nomeCliente;
    //Aqui estamos substituindo o antigo nome do cliente na posição do array que achamos acima pelo novo nome informado no input. 
    this.clientes[this.indiceAlterar] = this.nomeClienteInput;
  }


}
